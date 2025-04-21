<template>
  <div class="quiz-container">
    <div v-if="loading" class="loading">
      Loading quiz...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="!quizStarted" class="quiz-setup">
      <h2>Quiz Mode</h2>
      <p>Test your Japanese vocabulary knowledge!</p>
      
      <div class="quiz-options">
        <div class="form-group">
          <label for="quizType">Quiz Type</label>
          <select id="quizType" v-model="quizType">
            <option value="meaning-to-japanese">English to Japanese</option>
            <option value="japanese-to-meaning">Japanese to English</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="quizSize">Number of Questions</label>
          <select id="quizSize" v-model="quizSize">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="all">All Words</option>
          </select>
        </div>
      </div>
      
      <button @click="startQuiz" class="start-btn">Start Quiz</button>
    </div>
    
    <div v-else-if="quizComplete" class="quiz-results">
      <h2>Quiz Complete!</h2>
      
      <div class="score-summary">
        <p class="score">Your Score: {{ correctAnswers }} / {{ totalQuestions }}</p>
        <p class="percentage">{{ Math.round((correctAnswers / totalQuestions) * 100) }}%</p>
      </div>
      
      <div class="results-breakdown">
        <h3>Results Breakdown</h3>
        <div v-for="(result, index) in quizResults" :key="index" class="result-item">
          <div :class="['result-card', result.isCorrect ? 'correct' : 'incorrect']">
            <p class="word">
              <span v-if="result.word.kanji">{{ result.word.kanji }} ({{ result.word.kana }})</span>
              <span v-else>{{ result.word.kana }}</span>
            </p>
            <p class="meaning">{{ result.word.meaning }}</p>
            <p class="answer-status">
              <span v-if="result.isCorrect">✓ Correct</span>
              <span v-else>✗ Incorrect (Your answer: {{ result.userAnswer }})</span>
            </p>
          </div>
        </div>
      </div>
      
      <div class="quiz-actions">
        <button @click="resetQuiz" class="reset-btn">Take Another Quiz</button>
        <button @click="goToVocabulary" class="vocab-btn">Go to Vocabulary</button>
      </div>
    </div>
    
    <div v-else class="quiz-question">
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }"></div>
      </div>
      
      <div class="question-counter">
        Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
      </div>
      
      <div class="question">
        <h3>{{ questionPrompt }}</h3>
        
        <div v-if="quizType === 'meaning-to-japanese'" class="question-content">
          <p class="prompt">{{ currentQuestion.meaning }}</p>
          <input 
            type="text" 
            v-model="userAnswer" 
            placeholder="Enter in Japanese..."
            @keyup.enter="submitAnswer"
            ref="answerInput"
          />
        </div>
        
        <div v-else class="question-content">
          <p class="prompt">
            <span v-if="currentQuestion.kanji">{{ currentQuestion.kanji }}</span>
            <span v-else>{{ currentQuestion.kana }}</span>
          </p>
          <input 
            type="text" 
            v-model="userAnswer" 
            placeholder="Enter meaning in English..."
            @keyup.enter="submitAnswer"
            ref="answerInput"
          />
        </div>
        
        <button @click="submitAnswer" class="submit-btn">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { vocabularyService, progressService } from '../services/api';

export default {
  name: 'QuizMode',
  data() {
    return {
      loading: false,
      error: null,
      quizStarted: false,
      quizComplete: false,
      quizType: 'japanese-to-meaning',
      quizSize: '10',
      vocabulary: [],
      quizQuestions: [],
      currentQuestionIndex: 0,
      userAnswer: '',
      quizResults: [],
      correctAnswers: 0,
      userId: '1' // Hardcoded for now, should come from authentication
    };
  },
  computed: {
    totalQuestions() {
      return this.quizQuestions.length;
    },
    currentQuestion() {
      return this.quizQuestions[this.currentQuestionIndex] || {};
    },
    questionPrompt() {
      return this.quizType === 'meaning-to-japanese' 
        ? 'What is the Japanese for:' 
        : 'What is the meaning of:';
    }
  },
  created() {
    this.fetchVocabulary();
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
    startQuiz() {
      if (this.vocabulary.length === 0) {
        this.error = 'No vocabulary words available for quiz';
        return;
      }
      
      // Shuffle and select words for quiz
      const shuffled = [...this.vocabulary].sort(() => 0.5 - Math.random());
      const questionCount = this.quizSize === 'all' 
        ? this.vocabulary.length 
        : Math.min(parseInt(this.quizSize), this.vocabulary.length);
        
      this.quizQuestions = shuffled.slice(0, questionCount);
      this.quizStarted = true;
      this.quizComplete = false;
      this.currentQuestionIndex = 0;
      this.quizResults = [];
      this.correctAnswers = 0;
      this.userAnswer = '';
      
      // Focus on the answer input
      this.$nextTick(() => {
        if (this.$refs.answerInput) {
          this.$refs.answerInput.focus();
        }
      });
    },
    async submitAnswer() {
      if (!this.userAnswer.trim()) return;
      
      const currentWord = this.currentQuestion;
      let isCorrect = false;
      
      if (this.quizType === 'meaning-to-japanese') {
        const userAnswerClean = this.userAnswer.trim().toLowerCase();
        const correctKana = currentWord.kana.toLowerCase();
        const correctKanji = currentWord.kanji ? currentWord.kanji.toLowerCase() : '';
        
        isCorrect = userAnswerClean === correctKana || userAnswerClean === correctKanji;
      } else {
        const userAnswerClean = this.userAnswer.trim().toLowerCase();
        const correctMeaning = currentWord.meaning.toLowerCase();
        
        isCorrect = userAnswerClean === correctMeaning;
      }
      
      // Store result
      this.quizResults.push({
        word: currentWord,
        userAnswer: this.userAnswer,
        isCorrect
      });
      
      if (isCorrect) {
        this.correctAnswers++;
      }
      
      // Update user progress in the background
      this.updateProgress(currentWord._id, isCorrect);
      
      // Move to next question or complete quiz
      if (this.currentQuestionIndex < this.totalQuestions - 1) {
        this.currentQuestionIndex++;
        this.userAnswer = '';
        
        // Focus on the answer input for the next question
        this.$nextTick(() => {
          if (this.$refs.answerInput) {
            this.$refs.answerInput.focus();
          }
        });
      } else {
        this.quizComplete = true;
      }
    },
    async updateProgress(vocabularyId, isCorrect) {
      try {
        await progressService.updateProgress({
          userId: this.userId,
          vocabularyId,
          isCorrect
        });
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    },
    resetQuiz() {
      this.quizStarted = false;
      this.quizComplete = false;
      this.quizResults = [];
    },
    goToVocabulary() {
      this.$router.push('/vocabulary');
    }
  }
};
</script>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}

.error {
  color: #f44336;
}

.quiz-setup {
  text-align: center;
}

.quiz-options {
  max-width: 400px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
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

.start-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 30px;
  font-size: 18px;
  cursor: pointer;
}

.start-btn:hover {
  background-color: #45a049;
}

.quiz-question {
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.question-counter {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}

.question h3 {
  margin-bottom: 30px;
}

.question-content {
  margin-bottom: 20px;
}

.prompt {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 20px;
}

.submit-btn {
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 25px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0b7dda;
}

.quiz-results {
  text-align: center;
}

.score-summary {
  margin: 30px 0;
}

.score {
  font-size: 24px;
  font-weight: bold;
}

.percentage {
  font-size: 36px;
  font-weight: bold;
  color: #4CAF50;
}

.results-breakdown {
  margin: 30px 0;
  text-align: left;
}

.result-item {
  margin-bottom: 15px;
}

.result-card {
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.result-card.correct {
  border-left: 5px solid #4CAF50;
}

.result-card.incorrect {
  border-left: 5px solid #f44336;
}

.word {
  font-weight: bold;
  margin-bottom: 5px;
}

.answer-status {
  margin-top: 10px;
  font-style: italic;
}

.quiz-actions {
  margin-top: 30px;
}

.reset-btn, .vocab-btn {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.reset-btn {
  background-color: #2196F3;
  color: white;
}

.reset-btn:hover {
  background-color: #0b7dda;
}

.vocab-btn {
  background-color: #9E9E9E;
  color: white;
}

.vocab-btn:hover {
  background-color: #757575;
}
</style> 