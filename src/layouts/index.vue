<template>
  <div class="app-wrapper">
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
  import NavBar from './components/NavBar.vue'
</script>

<style lang="less" scoped>
  @import '../style/variables';
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
      margin-left: @sidebar-width;
    }
  }
</style>
