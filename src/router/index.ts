import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AboutmeRoute from '../components/aboutme/aboutme.vue'
const routes: Array<RouteRecordRaw> = [

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
