import Layout from '@/layouts/index.vue'

const group = {
  path: '/group',
  name: 'Group',
  redirect: '/group/group1',
  component: Layout,
  children: [
    {
      path: 'group1',
      name: 'Group1',
      redirect: '/group/group1/group1-1',
      component: () => import('@/pages/group/group1/index.vue'),
      children: [
        {
          path: 'group1-1',
          name: 'Group1-1',
          component: () => import('@/pages/group/group1/group1-1/index.vue'),
        },
        {
          path: 'group1-2',
          name: 'Group1-2',
          component: () => import('@/pages/group/group1/group1-2/index.vue'),
        },
      ],
    },
    {
      path: 'group2',
      name: 'Group2',
      redirect: '/group/group2/group2-1',
      component: () => import('@/pages/group/group2/index.vue'),
      children: [
        {
          path: 'group2-1',
          name: 'Group2-1',
          component: () => import('@/pages/group/group2/group2-1/index.vue'),
        },
        {
          path: 'group2-2',
          name: 'Group2-2',
          component: () => import('@/pages/group/group2/group2-2/index.vue'),
        },
      ],
    },
  ],
}

export default group
