import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: signup
    
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
