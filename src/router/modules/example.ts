import Layout from '@/layouts/index.vue'
import { shallowRef } from 'vue'

const example = {
  path: '/example',
  name: 'Example',
  meta: {
    title: 'Example',
    icon: 'CompassOutlined',
  },
  redirect: '/example/table',
  component: shallowRef(Layout),
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
