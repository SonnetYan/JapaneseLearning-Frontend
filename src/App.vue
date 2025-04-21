<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">
          日本語学習 <span class="logo-subtitle">Shoyo Japanese Learning</span>
        </router-link>
        
        <div class="nav-links">
          <router-link to="/" exact>Home</router-link>
          <router-link to="/vocabulary">Vocabulary</router-link>
          <router-link to="/quiz">Quiz</router-link>
        </div>
      </div>
    </nav>
    
    <main>
      <router-view/>
    </main>
    
    <footer>
      <div class="container">
        <p>Shoyo Japanese Learning &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  /* Haikyuu-inspired color palette */
  --hinata-orange: #F5A623;
  --hinata-light: #FFF5EB;
  --kageyama-blue: #1A3263;
  --tsukishima-yellow: #F0E68C;
  --sugawara-silver: #E0E0E0;
  --text-dark: #333333;
  --text-light: #FFFFFF;
  --shadow: rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-dark);
  background-color: var(--hinata-light);
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background-color: var(--kageyama-blue);
  box-shadow: 0 2px 8px var(--shadow);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--hinata-orange);
  text-decoration: none;
}

.logo-subtitle {
  font-size: 1rem;
  color: var(--text-light);
  font-weight: normal;
  margin-left: 8px;
}

.nav-links {
  display: flex;
}

.nav-links a {
  color: var(--text-light);
  text-decoration: none;
  padding: 10px 15px;
  font-weight: bold;
  transition: all 0.3s;
  border-radius: 4px;
}

.nav-links a:hover {
  color: var(--hinata-orange);
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-active {
  color: var(--hinata-orange);
  border-bottom: 2px solid var(--hinata-orange);
}

main {
  min-height: calc(100vh - 140px);
  padding: 20px 0;
}

footer {
  background-color: var(--kageyama-blue);
  color: var(--text-light);
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 -2px 8px var(--shadow);
}

/* Global button styles */
button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: var(--tsukishima-yellow);
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

button:hover {
  background-color: var(--hinata-orange);
  color: var(--text-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

button.active {
  background-color: var(--hinata-orange);
  color: var(--text-light);
}

/* Card styles */
.card {
  background-color: var(--text-light);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--shadow);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--text-light);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow);
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

thead th {
  background-color: var(--kageyama-blue);
  color: var(--text-light);
  font-weight: 500;
}

tbody tr:nth-child(even) {
  background-color: var(--hinata-light);
}

tbody tr:hover {
  background-color: var(--tsukishima-yellow);
}
</style>
