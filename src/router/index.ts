import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import example from './modules/example'
import nested from './modules/nested'
import group from './modules/group'
const routes = [
  {
    path: '/',
    name: 'dashboard',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
      },
    ],
  },
  example,
  {
    path: '/form',
    name: 'Form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/pages/form/index.vue'),
      },
    ],
  },
  nested,
  group,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
