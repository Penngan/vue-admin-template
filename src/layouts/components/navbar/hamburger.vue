<template>
  <div class="hamburger">
    <Icon name="AlignLeftOutlined"></Icon>
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue'
</script>

<style lang="less" scoped>
  @import '../../../style/variables';
  .hamburger {
    display: inline-flex;
    align-items: center;
    padding: 0 15px;
    height: @navbar-height;
    vertical-align: top;
    cursor: pointer;
  }
</style>
