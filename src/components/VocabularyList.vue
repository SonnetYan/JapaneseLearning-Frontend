<template>
  <div class="vocabulary-list">
    <h2>Vocabulary List</h2>
    
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Search vocabulary..." 
        @input="filterVocabulary"
      />
    </div>
    
    <div class="vocabulary-table">
      <table>
        <thead>
          <tr>
            <th>Kanji</th>
            <th>Kana</th>
            <th>Meaning</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="word in filteredVocabulary" :key="word._id">
            <td>{{ word.kanji || '–' }}</td>
            <td>{{ word.kana }}</td>
            <td>{{ word.meaning }}</td>
            <td>
              <button @click="viewDetails(word._id)">View</button>
              <button @click="editWord(word._id)">Edit</button>
              <button @click="deleteWord(word._id)">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredVocabulary.length === 0">
            <td colspan="4">No vocabulary words found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { vocabularyService } from '../services/api';

export default {
  name: 'VocabularyList',
  data() {
    return {
      vocabulary: [],
      filteredVocabulary: [],
      searchTerm: '',
      loading: true,
      error: null
    };
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
        this.filteredVocabulary = [...this.vocabulary];
      } catch (error) {
        this.error = 'Error fetching vocabulary: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    filterVocabulary() {
      if (!this.searchTerm) {
        this.filteredVocabulary = [...this.vocabulary];
        return;
      }
      
      const term = this.searchTerm.toLowerCase();
      this.filteredVocabulary = this.vocabulary.filter(word => 
        (word.kanji && word.kanji.toLowerCase().includes(term)) ||
        word.kana.toLowerCase().includes(term) ||
        word.meaning.toLowerCase().includes(term)
      );
    },
    viewDetails(id) {
      this.$router.push(`/vocabulary/${id}`);
    },
    editWord(id) {
      this.$router.push(`/vocabulary/edit/${id}`);
    },
    async deleteWord(id) {
      if (confirm('Are you sure you want to delete this word?')) {
        try {
          await vocabularyService.delete(id);
          this.vocabulary = this.vocabulary.filter(word => word._id !== id);
          this.filterVocabulary();
        } catch (error) {
          console.error('Error deleting word:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.vocabulary-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.vocabulary-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:nth-child(2) {
  background-color: #2196F3;
}

button:nth-child(2):hover {
  background-color: #0b7dda;
}

button:nth-child(3) {
  background-color: #f44336;
}

button:nth-child(3):hover {
  background-color: #d32f2f;
}
</style> 