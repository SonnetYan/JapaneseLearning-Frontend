<template>
  <div class="vocabulary-list-view">
    <h1>Vocabulary List</h1>
    
    <div class="actions">
      <router-link to="/vocabulary/add" class="add-btn">
        Add New Word
      </router-link>
      <router-link to="/flashcards" class="flashcard-btn">
        Flashcard Review
      </router-link>
    </div>
    
    <VocabularyList />
  </div>
</template>

<script>
import VocabularyList from '@/components/VocabularyList.vue'

export default {
  name: 'VocabularyListView',
  components: {
    VocabularyList
  }
}
</script>

<style scoped>
.vocabulary-list-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.add-btn, .flashcard-btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  color: white;
}

.add-btn {
  background-color: #4CAF50;
}

.add-btn:hover {
  background-color: #45a049;
}

.flashcard-btn {
  background-color: var(--hinata-orange, #F5A623);
}

.flashcard-btn:hover {
  opacity: 0.9;
}
</style> 