import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import userCompo from '../components/user.vue';
import articleBasicCompo from '../components/article_basic.vue';
import articleReqsCompo from '../components/article_reqs.vue';
import articleExplainedComp from '../components/articleexplained.vue';

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
  },
  {
    path: '/articleexplained',
    name: 'articleexplained',
    component: articleExplainedComp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
