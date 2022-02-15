<template>
  <Dropdown>
    <div class="cursor-pointer hover:bg-[#f6f6f6] px-[10px] h-full flex items-center">
      <img class="w-[24px] h-[24px] rounded-[50%]" :src="userStore.avatar" alt="" />
      <span class="pl-[10px] text-[14px]">{{ userStore.name }}</span>
    </div>
    <template #overlay>
      <Menu>
        <MenuItem key="0">Dashboard</MenuItem>
        <MenuDivider />
        <MenuItem key="1" @click="logout">退出</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
  import { Dropdown, Menu, MenuItem, MenuDivider } from 'ant-design-vue'
  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()
  const logout = () => {
    userStore.logout().then(() => {
      location.reload()
    })
  }
</script>

<style lang="less"></style>
