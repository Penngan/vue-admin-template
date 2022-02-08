<template>
  <div class="navbar-wrapper">
    <div class="flex items-center">
      <Hamburger />
      <Breadcrumb />
    </div>
    <div class="pr-[20px]">
      <Avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Hamburger from './hamburger.vue'
  import Breadcrumb from '@/components/breadcrumb/index.vue'
  import Avatar from './avatar.vue'
</script>

<style lang="less" scoped>
  @import '../../../style/variables';
  .navbar-wrapper {
    height: @navbar-height;
    overflow: hidden;
    position: relative;
    background: @navbar-background;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
