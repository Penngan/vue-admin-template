import Layout from '@/layouts/index.vue'
import { shallowRef } from 'vue'

const nested = {
  path: '/nested',
  name: 'Nested',
  meta: {
    title: 'Nested',
    icon: 'BarsOutlined',
  },
  redirect: '/nested/menu1',
  component: shallowRef(Layout),
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      meta: {
        title: 'Menu1',
      },
      component: () => import('@/pages/nested/menu1/index.vue'),
    },
    {
      path: 'menu2',
      name: 'Menu2',
      meta: {
        title: 'Menu2',
      },
      redirect: '/nested/menu2/menu2-1',
      component: () => import('@/pages/nested/menu2/index.vue'),
      children: [
        {
          path: 'menu2-1',
          name: 'Menu2-1',
          meta: {
            title: 'Menu2-1',
          },
          component: () => import('@/pages/nested/menu2/menu2-1/index.vue'),
        },
        {
          path: 'menu2-2',
          name: 'Menu2-2',
          meta: {
            title: 'Menu2-2',
          },
          component: () => import('@/pages/nested/menu2/menu2-2/index.vue'),
          children: [
            {
              path: 'menu2-2-1',
              name: 'Menu2-2-1',
              meta: {
                title: 'Menu2-2-1',
              },
              component: () => import('@/pages/nested/menu2/menu2-2/menu2-2-1/index.vue'),
            },
            {
              path: 'menu2-2-2',
              name: 'Menu2-2-2',
              meta: {
                title: 'Menu2-2-2',
                hideInMenu: true,
              },
              component: () => import('@/pages/nested/menu2/menu2-2/menu2-2-2/index.vue'),
            },
          ],
        },
        {
          path: 'menu2-3',
          name: 'Menu2-3',
          meta: {
            title: 'Menu2-3',
          },
          component: () => import('@/pages/nested/menu2/menu2-3/index.vue'),
        },
      ],
    },
  ],
}

export default nested
