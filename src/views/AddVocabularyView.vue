<template>
  <div class="add-vocabulary-view">
    <h1>Add New Vocabulary</h1>
    
    <VocabularyForm />
  </div>
</template>

<script>
import VocabularyForm from '@/components/VocabularyForm.vue'

export default {
  name: 'AddVocabularyView',
  components: {
    VocabularyForm
  }
}
</script>

<style scoped>
.add-vocabulary-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style> 