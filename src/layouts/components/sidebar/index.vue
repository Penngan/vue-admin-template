<template>
  <Drawer
    v-if="device === 'mobile'"
    v-model:visible="drawerVisible"
    placement="left"
    :closable="false"
    width="220"
    :body-style="{ padding: 0 }"
    mask-closable
  >
    <Menu @click="handleMenuItemClick" />
  </Drawer>
  <div v-else class="sidebar-container">
    <Menu :collapsed="collapsed" />
  </div>
</template>

<script setup lang="ts">
  import Menu from './menu.vue'
  import { Drawer } from 'ant-design-vue'
  import { computed } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  const appStore = useAppStore()
  const collapsed = computed(() => appStore.collapsed)
  const device = computed(() => appStore.device)
  const drawerVisible = computed({
    get() {
      return appStore.drawerVisible
    },
    set() {
      appStore.toggleDrawerVisible()
    },
  })

  const handleMenuItemClick = () => {
    appStore.toggleDrawerVisible()
  }
</script>

<style lang="less" scoped>
  @import '../../../style/variables';
  .sidebar-container {
    transition: width 0.3s;
    width: @sidebar-width !important;
    background-color: @menu-background;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
</style>
