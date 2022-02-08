<template>
  <Dropdown>
    <div class="cursor-pointer hover:bg-[#f6f6f6] h-[60px] leading-[60px] px-[10px]">
      <img class="w-[40px] h-[40px] rounded-[10px]" :src="userStore.avatar" alt="" />
      <span class="pl-[10px] text-[14px]">{{ userStore.name }}</span>
    </div>
    <template #overlay>
      <Menu>
        <MenuItem key="0">Dashboard</MenuItem>
        <MenuDivider />
        <MenuItem key="1">退出</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
  import { Dropdown, Menu, MenuItem, MenuDivider } from 'ant-design-vue'
  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()
</script>

<style lang="less"></style>
