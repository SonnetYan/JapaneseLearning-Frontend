import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/vocabulary',
    name: 'VocabularyList',
    component: () => import('../views/VocabularyListView.vue')
  },
  {
    path: '/vocabulary/add',
    name: 'AddVocabulary',
    component: () => import('../views/AddVocabularyView.vue')
  },
  {
    path: '/vocabulary/edit/:id',
    name: 'EditVocabulary',
    component: () => import('../views/EditVocabularyView.vue')
  },
  {
    path: '/vocabulary/:id',
    name: 'VocabularyDetail',
    component: () => import('../views/VocabularyDetailView.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/QuizView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 