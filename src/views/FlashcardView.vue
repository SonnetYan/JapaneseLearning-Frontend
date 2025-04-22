<template>
  <div class="flashcard-view">
    <h1>Flashcard Review</h1>
    
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else-if="!flashcardStarted" class="flashcard-setup">
      <h2>Flashcard Options</h2>
      
      <div class="form-group">
        <label for="flashcard-type">Flashcard Type</label>
        <select id="flashcard-type" v-model="flashcardType">
          <option value="japanese-to-meaning">Japanese to Meaning</option>
          <option value="meaning-to-japanese">Meaning to Japanese</option>
          <option value="mixed">Mixed (Both Directions)</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="flashcard-source">Flashcard Source</label>
        <select id="flashcard-source" v-model="flashcardSource">
          <option value="all">All Vocabulary</option>
          <option value="due">Due for Review</option>
        </select>
      </div>
      
      <div v-if="flashcardSource === 'all'" class="form-group">
        <label for="flashcard-count">Number of Flashcards</label>
        <select id="flashcard-count" v-model="flashcardCount">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="all">All</option>
        </select>
      </div>
      
      <button @click="startFlashcards" class="start-btn">Start Flashcards</button>
    </div>
    
    <div v-else-if="flashcardStarted && !flashcardComplete" class="flashcard-session">
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${(currentCardIndex / flashcards.length) * 100}%` }"></div>
        <div class="progress-text">{{ currentCardIndex }} / {{ flashcards.length }}</div>
      </div>
      
      <transition :name="slideDirection" mode="out-in">
        <div 
          :key="currentCardIndex"
          class="flashcard-container"
          @click="flipCard"
        >
          <div 
            class="flashcard" 
            :class="{ flipped: cardFlipped }"
          >
            <div class="flashcard-front">
              <div v-if="currentDirection === 'japanese-to-meaning'" class="japanese">
                <div v-if="currentCard.kanji" class="kanji">{{ currentCard.kanji }}</div>
                <div class="kana">{{ currentCard.kana }}</div>
              </div>
              <div v-else class="meaning">
                {{ currentCard.meaning }}
              </div>
            </div>
            
            <div class="flashcard-back">
              <div v-if="currentDirection === 'japanese-to-meaning'" class="meaning">
                {{ currentCard.meaning }}
              </div>
              <div v-else class="japanese">
                <div v-if="currentCard.kanji" class="kanji">{{ currentCard.kanji }}</div>
                <div class="kana">{{ currentCard.kana }}</div>
              </div>
              
              <div v-if="currentCard.examples && currentCard.examples.length" class="examples">
                <div class="example">
                  <div class="japanese-example">{{ currentCard.examples[0].japanese }}</div>
                  <div class="english-example">{{ currentCard.examples[0].english }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
      <div v-if="cardFlipped" class="flashcard-actions">
        <button @click="rateCard('hard')" class="hard-btn">Hard</button>
        <button @click="rateCard('good')" class="good-btn">Good</button>
        <button @click="rateCard('easy')" class="easy-btn">Easy</button>
      </div>
    </div>
    
    <div v-else class="flashcard-complete">
      <h2>Flashcard Session Complete!</h2>
      
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Total Cards:</span>
          <span class="stat-value">{{ flashcards.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Easy:</span>
          <span class="stat-value">{{ stats.easy }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Good:</span>
          <span class="stat-value">{{ stats.good }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Hard:</span>
          <span class="stat-value">{{ stats.hard }}</span>
        </div>
      </div>
      
      <div class="flashcard-complete-actions">
        <button @click="resetFlashcards" class="reset-btn">Start New Session</button>
        <router-link to="/vocabulary" class="vocab-btn">Back to Vocabulary</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { vocabularyService, progressService } from '../services/api';

export default {
  name: 'FlashcardView',
  data() {
    return {
      loading: false,
      error: null,
      vocabulary: [],
      dueForReview: [],
      flashcardStarted: false,
      flashcardComplete: false,
      flashcardType: 'japanese-to-meaning',
      flashcardSource: 'all',
      flashcardCount: '10',
      flashcards: [],
      currentCardIndex: 0,
      cardFlipped: false,
      currentDirection: 'japanese-to-meaning',
      stats: {
        easy: 0,
        good: 0,
        hard: 0
      },
      userId: '1', // Hardcoded for now, should come from authentication
      isTransitioning: false,
      slideDirection: 'card-slide-left'
    };
  },
  computed: {
    currentCard() {
      return this.flashcards[this.currentCardIndex] || {};
    }
  },
  created() {
    this.fetchVocabulary();
    this.fetchDueWords();
  },
  methods: {
    async fetchVocabulary() {
      this.loading = true;
      try {
        const response = await vocabularyService.getAll();
        this.vocabulary = response.data;
      } catch (error) {
        this.error = 'Error loading vocabulary: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchDueWords() {
      try {
        const response = await progressService.getReviewWords(this.userId);
        this.dueForReview = response.data.map(item => item.vocabularyId);
      } catch (error) {
        console.error('Error fetching due words:', error);
        // Fallback to all vocabulary if there's an error
        this.dueForReview = [];
      }
    },
    startFlashcards() {
      let wordPool = [];
      
      // Determine which words to use
      if (this.flashcardSource === 'due' && this.dueForReview.length > 0) {
        wordPool = this.dueForReview;
      } else {
        wordPool = this.vocabulary;
      }
      
      if (wordPool.length === 0) {
        this.error = 'No vocabulary words available for flashcards';
        return;
      }
      
      // Shuffle the words
      const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
      
      // Select the number of words
      const cardCount = this.flashcardCount === 'all' 
        ? wordPool.length 
        : Math.min(parseInt(this.flashcardCount), wordPool.length);
      
      this.flashcards = shuffled.slice(0, cardCount);
      
      // Prepare cards with directions
      if (this.flashcardType === 'mixed') {
        // For mixed, we'll set the direction for each card
        this.flashcards = this.flashcards.map(card => ({
          ...card,
          direction: Math.random() > 0.5 ? 'japanese-to-meaning' : 'meaning-to-japanese'
        }));
        // Set initial direction
        this.currentDirection = this.flashcards[0].direction;
      } else {
        // Otherwise, all cards use the same direction
        this.currentDirection = this.flashcardType;
      }
      
      // Reset session stats
      this.currentCardIndex = 0;
      this.cardFlipped = false;
      this.flashcardStarted = true;
      this.flashcardComplete = false;
      this.stats = {
        easy: 0,
        good: 0,
        hard: 0
      };
      this.slideDirection = 'card-slide-left';
    },
    flipCard() {
      if (!this.cardFlipped && !this.isTransitioning) {
        this.cardFlipped = true;
      }
    },
    async rateCard(difficulty) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      
      // Update stats
      this.stats[difficulty]++;
      
      // Calculate new status based on difficulty
      let newStatus;
      let isCorrect = true;
      
      switch (difficulty) {
        case 'easy':
          newStatus = 'mastered';
          break;
        case 'good':
          newStatus = 'reviewing';
          break;
        case 'hard':
          newStatus = 'learning';
          isCorrect = false;
          break;
        default:
          newStatus = 'learning';
      }
      
      // Update progress in the backend
      try {
        await progressService.updateProgress({
          userId: this.userId,
          vocabularyId: this.currentCard._id,
          status: newStatus,
          isCorrect
        });
      } catch (error) {
        console.error('Error updating progress:', error);
      }
      
      // Check if we've reached the end
      if (this.currentCardIndex >= this.flashcards.length - 1) {
        // We've reached the end
        this.flashcardComplete = true;
        this.isTransitioning = false;
        return;
      }
      
      // Move to next card - now we don't flip back, we just let the card slide away
      this.slideDirection = 'card-slide-left';
      
      // Use setTimeout to ensure the card slide transition completes before moving to the next card
      setTimeout(() => {
        this.currentCardIndex++;
        
        // Update direction for next card if mixed
        if (this.flashcardType === 'mixed') {
          this.currentDirection = this.flashcards[this.currentCardIndex].direction;
        }
        
        // Reset flip state for the next card
        this.cardFlipped = false;
        this.isTransitioning = false;
      }, 300); // This delay should be equal to or slightly less than the CSS transition time
    },
    resetFlashcards() {
      this.flashcardStarted = false;
      this.flashcardComplete = false;
      this.currentCardIndex = 0;
      this.cardFlipped = false;
      this.isTransitioning = false;
      
      // Refresh the due words
      this.fetchDueWords();
    }
  }
};
</script>

<style scoped>
.flashcard-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.loading, .error {
  text-align: center;
  padding: 40px;
}

.error {
  color: #f44336;
}

.flashcard-setup {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.start-btn, .reset-btn, .vocab-btn {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.start-btn {
  background-color: var(--hinata-orange, #F5A623);
  color: white;
}

.start-btn:hover {
  opacity: 0.9;
}

.progress-bar {
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
}

.progress {
  height: 100%;
  background-color: var(--hinata-orange, #F5A623);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 14px;
  color: #666;
}

/* Improved card transitions */
.card-slide-left-enter-active,
.card-slide-left-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.card-slide-left-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.card-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}

.flashcard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  will-change: transform, opacity;
  perspective: 2000px;
}

.flashcard {
  position: relative;
  width: 500px;
  max-width: 100%;
  height: 300px;
  transform-style: preserve-3d;
  transition: transform 0.1s;
  will-change: transform;
}

.flashcard:hover {
  transform: scale(1.02);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  will-change: transform;
}

.flashcard-front {
  background-color: var(--kageyama-blue, #1A3263);
  color: white;
  z-index: 2;
  transform: rotateY(0deg);
}

.flashcard-back {
  background-color: white;
  border: 2px solid var(--kageyama-blue, #1A3263);
  color: #333;
  transform: rotateY(180deg);
}

.flashcard.flipped .flashcard-front {
  transform: rotateY(180deg);
}

.flashcard.flipped .flashcard-back {
  transform: rotateY(0deg);
}

.kanji {
  font-size: 3rem;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUpIn 0.5s forwards;
}

.kana {
  font-size: 1.8rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUpIn 0.5s 0.1s forwards;
}

.meaning {
  font-size: 2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUpIn 0.5s 0.2s forwards;
}

@keyframes fadeUpIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.examples {
  margin-top: 20px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.5s 0.3s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.example {
  border-top: 1px solid #eee;
  padding-top: 15px;
  text-align: center;
}

.japanese-example {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.english-example {
  color: #666;
}

.flashcard-actions {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;
}

.hard-btn, .good-btn, .easy-btn {
  flex: 1;
  padding: 12px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 4px;
  transition: transform 0.2s, opacity 0.2s;
}

.hard-btn:hover, .good-btn:hover, .easy-btn:hover {
  transform: translateY(-3px);
  opacity: 0.9;
}

.hard-btn {
  background-color: #f44336;
  color: white;
}

.good-btn {
  background-color: #2196F3;
  color: white;
}

.easy-btn {
  background-color: #4CAF50;
  color: white;
}

.flashcard-complete {
  text-align: center;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
}

.stat-item {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  margin: 0 5px;
}

.stat-label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.5rem;
  color: var(--hinata-orange, #F5A623);
}

.flashcard-complete-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.reset-btn, .vocab-btn {
  flex: 1;
  margin: 0 10px;
}

.reset-btn {
  background-color: var(--hinata-orange, #F5A623);
  color: white;
}

.vocab-btn {
  background-color: var(--kageyama-blue, #1A3263);
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .flashcard {
    width: 100%;
    height: 250px;
  }
  
  .kanji {
    font-size: 2.5rem;
  }
  
  .kana {
    font-size: 1.5rem;
  }
  
  .meaning {
    font-size: 1.8rem;
  }
}
</style> 