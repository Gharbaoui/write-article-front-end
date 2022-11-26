import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import userCompo from '../components/user.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'user'}
  },
  {
    path: '/user',
    name: 'user',
    component: userCompo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
