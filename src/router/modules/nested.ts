import Layout from '@/layouts/index.vue'

const nested = {
  path: '/nested',
  name: 'Nested',
  redirect: '/nested/menu1',
  component: Layout,
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      component: () => import('@/pages/nested/menu1/index.vue'),
    },
    {
      path: 'menu2',
      name: 'Menu2',
      redirect: '/nested/menu2/menu2-1',
      component: () => import('@/pages/nested/menu2/index.vue'),
      children: [
        {
          path: 'menu2-1',
          name: 'Menu2-1',
          component: () => import('@/pages/nested/menu2/menu2-1/index.vue'),
        },
        {
          path: 'menu2-2',
          name: 'Menu2-2',
          component: () => import('@/pages/nested/menu2/menu2-2/index.vue'),
          children: [
            {
              path: 'menu2-2-1',
              name: 'Menu2-2-1',
              component: () => import('@/pages/nested/menu2/menu2-2/menu2-2-1/index.vue'),
            },
            {
              path: 'menu2-2-2',
              name: 'Menu2-2-2',
              component: () => import('@/pages/nested/menu2/menu2-2/menu2-2-2/index.vue'),
            },
          ],
        },
        {
          path: 'menu2-3',
          name: 'Menu2-3',
          component: () => import('@/pages/nested/menu2/menu2-3/index.vue'),
        },
      ],
    },
  ],
}

export default nested
