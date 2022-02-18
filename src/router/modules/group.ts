import Layout from '@/layouts/index.vue'
import { shallowRef } from 'vue'

const group = {
  path: '/group',
  name: 'Group',
  meta: {
    title: 'Group',
    icon: 'GroupOutlined',
  },
  redirect: '/group/group1',
  component: shallowRef(Layout),
  children: [
    {
      path: 'group1',
      name: 'Group1',
      meta: {
        title: 'Group1',
        groupInMenu: true,
      },
      redirect: '/group/group1/group1-1',
      component: () => import('@/pages/group/group1/index.vue'),
      children: [
        {
          path: 'group1-1',
          name: 'Group1-1',
          meta: {
            title: 'Group1-1',
          },
          component: () => import('@/pages/group/group1/group1-1/index.vue'),
        },
        {
          path: 'group1-2',
          name: 'Group1-2',
          meta: {
            title: 'Group1-2',
          },
          component: () => import('@/pages/group/group1/group1-2/index.vue'),
        },
      ],
    },
    {
      path: 'group2',
      name: 'Group2',
      meta: {
        title: 'Group2',
        groupInMenu: true,
      },
      redirect: '/group/group2/group2-1',
      component: () => import('@/pages/group/group2/index.vue'),
      children: [
        {
          path: 'group2-1',
          name: 'Group2-1',
          meta: {
            title: 'Group2-1',
          },
          component: () => import('@/pages/group/group2/group2-1/index.vue'),
        },
        {
          path: 'group2-2',
          name: 'Group2-2',
          meta: {
            title: 'Group2-2',
          },
          component: () => import('@/pages/group/group2/group2-2/index.vue'),
        },
      ],
    },
  ],
}

export default group
