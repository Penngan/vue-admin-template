import Layout from '@/layouts/index.vue'

const example = {
  path: '/example',
  name: 'Example',
  meta: {
    title: 'Example',
    icon: 'CompassOutlined',
  },
  redirect: '/example/table',
  component: Layout,
  children: [
    {
      path: 'table',
      name: 'Table',
      meta: {
        title: 'Table',
        icon: 'TableOutlined',
      },
      component: () => import('@/pages/example/table/index.vue'),
    },
  ],
}

export default example
