<template>
  <div class="edit-vocabulary-view">
    <h1>Edit Vocabulary</h1>
    
    <VocabularyForm :id="$route.params.id" />
  </div>
</template>

<script>
import VocabularyForm from '@/components/VocabularyForm.vue'

export default {
  name: 'EditVocabularyView',
  components: {
    VocabularyForm
  }
}
</script>

<style scoped>
.edit-vocabulary-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style> 