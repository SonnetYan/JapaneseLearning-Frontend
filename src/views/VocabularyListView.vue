<template>
  <div class="vocabulary-list-view">
    <h1>Vocabulary List</h1>
    
    <div class="actions">
      <router-link to="/vocabulary/add" class="add-btn">
        Add New Word
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
}

.add-btn {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.add-btn:hover {
  background-color: #45a049;
}
</style> 