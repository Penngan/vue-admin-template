<template>
  <div class="hamburger" @click="toggleCollapsed">
    <Icon v-if="collapse" name="align-left-outlined" size="20"></Icon>
    <Icon v-else name="align-right-outlined" size="20"></Icon>
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue'
  import { useAppStore } from '@/store/modules/app'
  import { computed } from 'vue'

  const appStore = useAppStore()
  const collapse = computed(() => appStore.collapsed)
  const toggleCollapsed = () => {
    if (appStore.device === 'mobile') {
      appStore.toggleDrawerVisible()
    } else {
      appStore.toggleCollapsed()
    }
  }
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
