<template>
  <Menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    class="menu-wrapper"
    :data="data"
    index="path"
    router
    theme="dark"
    mode="inline"
  ></Menu>
</template>

<script setup lang="ts">
  import Menu from '@/components/menu'
  import type { MenuItem } from '@/components/menu/types'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const selectedKeys = ref<string[]>(['/dashboard'])
  const openKeys = ref<string[]>([])

  const routes = useRouter()

  const data: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'DashboardOutlined',
      path: '/dashboard',
    },
    {
      title: 'Example',
      icon: 'CompassOutlined',
      path: '/example',
      children: [
        {
          title: 'Table',
          icon: 'TableOutlined',
          path: '/example/table',
        },
      ],
    },
    {
      title: 'Form',
      icon: 'FormOutlined',
      path: '/form/index',
    },
    {
      title: 'Nested',
      icon: 'BarsOutlined',
      path: '/nested',
      children: [
        {
          title: 'Menu1',
          path: '/nested/menu1',
        },
        {
          title: 'Menu2',
          path: '/nested/menu2',
          children: [
            {
              title: 'Menu2-1',
              path: '/nested/menu2/menu2-1',
            },
            {
              title: 'Menu2-2',
              path: '/nested/menu2/menu2-2',
              children: [
                {
                  title: 'Menu2-2-1',
                  path: '/nested/menu2/menu2-2/menu2-2-1',
                },
                {
                  title: 'Menu2-2-2',
                  path: '/nested/menu2/menu2-2/menu2-2-2',
                },
              ],
            },
            {
              title: 'Menu2-3',
              path: '/nested/menu2/menu2-3',
            },
          ],
        },
      ],
    },
    {
      title: 'Group',
      icon: 'GroupOutlined',
      path: '/group',
      children: [
        {
          title: 'Group1',
          path: '/group/group1',
          icon: 'GroupOutlined',
          group: true,
          children: [
            {
              title: 'Group1-1',
              path: '/group/group1/group1-1',
            },
            {
              title: 'Group1-2',
              path: '/group/group1/group1-2',
            },
          ],
        },
        {
          title: 'Group2',
          path: '/group/group2',
          group: true,
          children: [
            {
              title: 'Group2-1',
              path: '/group/group2/group2-1',
            },
            {
              title: 'Group2-2',
              path: '/group/group2/group2-2',
            },
          ],
        },
      ],
    },
  ]
</script>

<style lang="less">
  @import '../../../style/variables';
  .menu-wrapper {
    background: @menu-background !important;
    height: 100%;
    .ant-menu-sub {
      background: @submenu-background !important;
    }
    .ant-menu-item-selected {
      background: @primary-color !important;
    }
  }
</style>
