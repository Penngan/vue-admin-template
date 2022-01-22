import Layout from '@/layouts/index.vue'

const example = {
  path: '/example',
  name: 'Example',
  redirect: '/example/table',
  component: Layout,
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/pages/example/table/index.vue'),
    },
  ],
}

export default example
