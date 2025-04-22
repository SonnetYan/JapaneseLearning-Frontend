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
          <tr v-for="word in filteredVocabulary" 
              :key="word._id" 
              @click="handleRowClick($event, word._id)"
              class="vocabulary-row">
            <td>{{ word.kanji || '–' }}</td>
            <td>{{ word.kana }}</td>
            <td>{{ word.meaning }}</td>
            <td class="actions-cell">
              <button @click.stop="viewDetails(word._id)">View</button>
              <button @click.stop="editWord(word._id)">Edit</button>
              <button @click.stop="deleteWord(word._id)">Delete</button>
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
    },
    handleRowClick(event, id) {
      // If the click is not from a button (handled by other methods)
      if (!event.target.closest('button')) {
        this.viewDetails(id);
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
  background-color: var(--kageyama-blue, #1A3263);
  color: var(--text-light, #FFFFFF);
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid var(--hinata-orange, #F5A623);
  font-size: 16px;
  font-weight: bold;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

button {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px var(--shadow, rgba(0, 0, 0, 0.1));
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow, rgba(0, 0, 0, 0.1));
}

button:nth-child(1) {
  background-color: var(--hinata-orange, #F5A623);
  color: var(--text-light, #FFFFFF);
}

button:nth-child(1):hover {
  opacity: 0.9;
}

button:nth-child(2) {
  background-color:rgb(58, 104, 195); 
  color: var(--text-light, #FFFFFF);
}

button:nth-child(2):hover {
  opacity: 0.9;
}

button:nth-child(3) {
  background-color:rgb(249, 79, 67);
  color: var(--text-light, #FFFFFF);
}

button:nth-child(3):hover {
  opacity: 0.9;
}

.vocabulary-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.vocabulary-row:hover {
  background-color: rgba(26, 50, 99, 0.1);
}

.actions-cell {
  white-space: nowrap;
}
</style> 