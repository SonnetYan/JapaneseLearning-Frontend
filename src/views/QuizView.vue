<template>
  <div class="quiz-view">
    <h1>Quiz Mode</h1>
    
    <QuizMode />
  </div>
</template>

<script>
import QuizMode from '@/components/QuizMode.vue'

export default {
  name: 'QuizView',
  components: {
    QuizMode
  }
}
</script>

<style scoped>
.quiz-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style> 