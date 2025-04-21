<template>
  <div class="kana-view">
    <h1>五十音图学习</h1>
    <p class="description">点击卡片查看假名对应的罗马音标注。选择平假名或片假名，也可以按行筛选显示。</p>
    <KanaCard />
  </div>
</template>

<script>
import KanaCard from '@/components/KanaCard.vue'

export default {
  name: 'KanaView',
  components: {
    KanaCard
  }
}
</script>

<style scoped>
.kana-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}
</style> 