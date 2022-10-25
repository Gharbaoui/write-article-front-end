import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import UserRout from '../components/user/user.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'aboutme'}
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    component: UserRout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
