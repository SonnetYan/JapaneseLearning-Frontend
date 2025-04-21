<template>
  <div class="home">
    <div class="hero">
      <h1>Japanese Learning App</h1>
      <p class="subtitle">Build your Japanese vocabulary and track your progress</p>
      
      <div class="action-buttons">
        <router-link to="/vocabulary" class="btn btn-primary">
          View Vocabulary
        </router-link>
        <router-link to="/quiz" class="btn btn-secondary">
          Take a Quiz
        </router-link>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>Vocabulary Management</h3>
        <p>Create and organize your Japanese vocabulary with kanji, kana, meanings, and example sentences.</p>
      </div>
      
      <div class="feature-card">
        <h3>Quiz Mode</h3>
        <p>Test your knowledge with customizable quizzes to reinforce your learning.</p>
      </div>
      
      <div class="feature-card">
        <h3>Progress Tracking</h3>
        <p>Track your learning progress and focus on words that need more practice.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 40px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #2196F3;
  color: white;
}

.btn-secondary:hover {
  background-color: #0b7dda;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}
</style> 