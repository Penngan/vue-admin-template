<template>
  <div class="navbar-wrapper">
    <Icon name="AlignLeftOutlined"></Icon>
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue'
</script>

<style lang="less" scoped>
  @import '../../style/variables';
  .navbar-wrapper {
    height: @navbar-height;
    overflow: hidden;
    position: relative;
    background: @navbar-background;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
</style>
