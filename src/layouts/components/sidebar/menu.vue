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
    :inline-collapsed="collapsed"
    @click="handleMenuItemClick"
  ></Menu>
</template>

<script setup lang="ts">
  import Menu from '@/components/menu'
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { usePermissionStore } from '@/store/modules/permission'

  const props = defineProps({
    collapsed: Boolean,
  })

  const emits = defineEmits(['click'])

  const permissionStore = usePermissionStore()
  const menus = permissionStore.routes
  const selectedKeys = ref<string[]>(['/dashboard'])
  const openKeys = ref<string[]>([])

  const route = useRoute()
  const handleMenuItemClick = () => {
    emits('click')
  }
  watch(
    () => route.fullPath,
    () => {
      const { fullPath, matched } = route
      selectedKeys.value = [fullPath]
      if (!props.collapsed) {
        openKeys.value = matched.map(({ path }) => path)
      }
    },
    { immediate: true }
  )
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
