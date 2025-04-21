<template>
  <div class="vocabulary-detail-view">
    <div v-if="loading" class="loading">Loading...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="vocabulary-detail">
      <div class="header-actions">
        <router-link to="/vocabulary" class="back-btn">
          Back to List
        </router-link>
        <div class="actions">
          <router-link :to="`/vocabulary/edit/${word._id}`" class="edit-btn">
            Edit
          </router-link>
          <button @click="deleteWord" class="delete-btn">Delete</button>
        </div>
      </div>
      
      <div class="word-header">
        <h1>
          <span v-if="word.kanji" class="kanji">{{ word.kanji }}</span>
          <span class="kana">{{ word.kana }}</span>
        </h1>
        <p class="meaning">{{ word.meaning }}</p>
      </div>
      
      <div v-if="word.tags && word.tags.length" class="tags">
        <span v-for="(tag, index) in word.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
      
      <div class="examples">
        <h2>Example Sentences</h2>
        <div v-for="(example, index) in word.examples" :key="index" class="example">
          <p class="japanese">{{ example.japanese }}</p>
          <p class="english">{{ example.english }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vocabularyService } from '../services/api';

export default {
  name: 'VocabularyDetailView',
  data() {
    return {
      word: {},
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchWord();
  },
  methods: {
    async fetchWord() {
      this.loading = true;
      try {
        const response = await vocabularyService.getById(this.$route.params.id);
        this.word = response.data;
      } catch (error) {
        this.error = 'Error fetching vocabulary: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteWord() {
      if (confirm('Are you sure you want to delete this word?')) {
        try {
          await vocabularyService.delete(this.word._id);
          this.$router.push('/vocabulary');
        } catch (error) {
          console.error('Error deleting word:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.vocabulary-detail-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
}

.error {
  color: #f44336;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn, .edit-btn, .delete-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.back-btn {
  color: #2196F3;
  text-decoration: none;
}

.back-btn:hover {
  text-decoration: underline;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #0b7dda;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.word-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.kanji {
  font-size: 3rem;
  margin-right: 15px;
}

.kana {
  font-size: 2rem;
  color: #666;
}

.meaning {
  font-size: 1.5rem;
  color: #333;
}

.tags {
  margin-bottom: 20px;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.examples h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.example {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.japanese {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.english {
  color: #666;
}
</style> 