<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  @import '../../style/variables.less';
  .app-main {
    min-height: ~'calc(100vh - @{navbar-height})';
    width: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
