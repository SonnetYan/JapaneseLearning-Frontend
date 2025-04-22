<template>
  <div class="home">
    <div class="hero">
      <h1>Japanese Learning App-- kana audio</h1>
      <p class="subtitle">Build your Japanese vocabulary and track your progress</p>
      
      <div class="action-buttons">
        <router-link to="/vocabulary" class="btn btn-primary">
          View Vocabulary
        </router-link>
        <router-link to="/quiz" class="btn btn-secondary">
          Take a Quiz
        </router-link>
        <router-link to="/kana" class="btn btn-accent">
          Learn Kana
        </router-link>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>Vocabulary Management</h3>
        <p>Create and organize your Japanese vocabulary with kanji, kana, meanings, and example sentences.</p>
        <router-link to="/vocabulary" class="feature-link">Get Started →</router-link>
      </div>
      
      <div class="feature-card">
        <h3>Quiz Mode</h3>
        <p>Test your knowledge with customizable quizzes to reinforce your learning.</p>
        <router-link to="/quiz" class="feature-link">Try a Quiz →</router-link>
      </div>
      
      <div class="feature-card">
        <h3>五十音図 (Gojūon)</h3>
        <p>Study hiragana and katakana with interactive cards to master the Japanese writing system.</p>
        <router-link to="/kana" class="feature-link">Practice Kana →</router-link>
      </div>
    </div>
    
    <!-- 简单的背景水印层 - 根据showWatermark状态显示或隐藏 -->
    <div class="watermark-overlay" v-if="showWatermark"></div>
  </div>
</template>

<script>
import WatermarkImage from '@/assets/watermark.png'; // 导入图片

export default {
  name: 'HomeView',
  data() {
    return {
      watermarkUrl: WatermarkImage,
      showWatermark: true // 默认显示水印
    }
  },
  methods: {
    // 切换水印显示/隐藏
    toggleWatermark() {
      this.showWatermark = !this.showWatermark;
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative; /* 为绝对定位的水印提供参考 */
}

/* 水印覆盖层 */
.watermark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('~@/assets/watermark.png'); /* 使用~@语法 */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80% auto;
  opacity: 0.2;
  z-index: -1; /* 放在内容下方 */
  pointer-events: none; /* 不阻止点击 */
}

.hero {
  text-align: center;
  padding: 50px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
  position: relative; /* 确保内容在水印之上 */
  z-index: 2;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: var(--text-dark);
}

.subtitle {
  font-size: 1.5rem;
  color: var(--text-dark);
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px var(--shadow);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px var(--shadow);
}

.btn-primary {
  background-color: var(--hinata-orange);
  color: var(--text-light);
}

.btn-primary:hover {
  background-color: var(--hinata-orange);
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--kageyama-blue);
  color: var(--text-light);
}

.btn-secondary:hover {
  background-color: var(--kageyama-blue);
  opacity: 0.9;
}

.btn-accent {
  background-color: var(--tsukishima-yellow);
  color: var(--text-dark);
}

.btn-accent:hover {
  background-color: var(--tsukishima-yellow);
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background-color: var(--text-light);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px var(--shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px var(--shadow);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--kageyama-blue);
}

.feature-card p {
  color: var(--text-dark);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.feature-link {
  display: inline-block;
  color: var(--hinata-orange);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.feature-link:hover {
  color: var(--hinata-orange);
  opacity: 0.8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .watermark {
    width: 30vw; /* slightly larger on small screens */
  }
}
</style> 