<template>
  <div class="sidebar-container"> sidebar </div>
</template>

<script setup lang="ts"></script>

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
