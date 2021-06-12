import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
