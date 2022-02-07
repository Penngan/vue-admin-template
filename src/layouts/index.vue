<template>
  <div class="app-wrapper" :class="classes">
    <SideBar />
    <div class="main-container">
      <NavBar />
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import SideBar from './components/sidebar/index.vue'
  import AppMain from './components/AppMain.vue'
  import NavBar from './components/navbar/index.vue'
  import { useAppStore } from '@/store/modules/app'
  import { computed } from 'vue'
  import { useWindowResize } from '@/hooks/useWindowResize'

  useWindowResize()
  const appStore = useAppStore()
  const classes = computed(() => ({
    'is-collapsed': appStore.collapsed,
    'is-mobile': appStore.device === 'mobile',
  }))
</script>

<style lang="less" scoped>
  @import '../style/variables';
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
      margin-left: 80px;
      transition: margin-left 0.3s;
    }
    &:not(.is-collapsed) {
      .main-container {
        margin-left: @sidebar-width;
      }
    }
    &.is-collapsed {
      .sidebar-container {
        width: 80px !important;
      }
    }
    &.is-mobile {
      .sidebar-container {
        display: none;
      }
      .main-container {
        margin-left: 0 !important;
      }
    }
  }
</style>
