import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../pages/auth/LoginForm.vue'
import Dashboard from '@/pages/dashboard/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})

export default router