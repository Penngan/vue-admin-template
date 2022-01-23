<template>
  <Menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    class="menu-wrapper"
    :data="menus"
    index="path"
    router
    theme="dark"
    mode="inline"
  ></Menu>
</template>

<script setup lang="ts">
  import Menu from '@/components/menu'
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import useRouterToMenu from '@/layouts/hooks/useRouterToMenu'

  const selectedKeys = ref<string[]>(['/dashboard'])
  const openKeys = ref<string[]>([])

  const routes = useRouter()
  const route = useRoute()
  onMounted(() => {
    const { fullPath, matched } = route
    selectedKeys.value = [fullPath]
    openKeys.value = matched.map(({ path }) => path)
  })
  const menus = useRouterToMenu(routes.options.routes)
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
