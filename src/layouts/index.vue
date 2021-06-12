<template>
  <div class="relative w-full h-full app-wrapper">
    <SideBar />
    <div class="main-container ml-52.5">
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
