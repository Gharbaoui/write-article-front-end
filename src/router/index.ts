import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import userCompo from '../components/user.vue';
import articleBasicCompo from '../components/article_basic.vue';
import articleReqsCompo from '../components/article_reqs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'user'}
  },
  {
    path: '/user',
    name: 'user',
    component: userCompo
  },
  {
    path: '/articlebasic',
    name: 'articlebasic',
    component: articleBasicCompo
  },
  {
    path: '/articlereqs',
    name: 'articlereqs',
    component: articleReqsCompo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
