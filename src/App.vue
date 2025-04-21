<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">
          日本語学習 <span class="logo-subtitle">Japanese Learning</span>
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
        <p>Japanese Learning App &copy; {{ new Date().getFullYear() }}</p>
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f9f9f9;
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: #4CAF50;
  text-decoration: none;
}

.logo-subtitle {
  font-size: 1rem;
  color: #666;
  font-weight: normal;
}

.nav-links {
  display: flex;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  padding: 10px 15px;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #4CAF50;
}

.nav-links a.router-link-active {
  color: #4CAF50;
  border-bottom: 2px solid #4CAF50;
}

main {
  min-height: calc(100vh - 140px);
  padding: 20px 0;
}

footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}
</style>
