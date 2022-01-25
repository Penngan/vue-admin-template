import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import example from './modules/example'
import nested from './modules/nested'
import group from './modules/group'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hideInMenu: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    meta: { hideInMenu: true },
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/404',
    meta: { hideInMenu: true },
    component: () => import('@/pages/error-page/404.vue'),
  },
  {
    path: '/401',
    meta: { hideInMenu: true },
    component: () => import('@/pages/error-page/401.vue'),
  },
  {
    path: '/',
    name: 'dashboard',
    redirect: '/dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'DashboardOutlined',
      hideChildrenInMenu: true,
    },
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'DashboardOutlined',
        },
        component: () => import('@/pages/dashboard/index.vue'),
      },
    ],
  },
]
export const asyncRoutes: RouteRecordRaw[] = [
  example,
  {
    path: '/form',
    name: 'Form',
    component: Layout,
    meta: {
      title: 'Form',
      icon: 'FormOutlined',
      hideChildrenInMenu: true,
    },
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
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
})

export default router
