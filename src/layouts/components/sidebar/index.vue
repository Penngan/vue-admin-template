<template>
  <div class="sidebar-container">
    <Menu />
  </div>
</template>

<script setup lang="ts">
  import Menu from './menu.vue'
</script>

<style lang="less" scoped>
  @import '../../../style/variables';
  .sidebar-container {
    transition: width 3s;
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
