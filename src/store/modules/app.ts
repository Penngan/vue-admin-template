import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    collapsed: false,
    device: 'desktop',
    drawerVisible: false,
    showHeader: true,
    showAside: true,
  }),
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleShowHeader() {
      this.showHeader = !this.showHeader
    },
    toggleShowAside() {
      this.showAside = !this.showAside
    },
    toggleDrawerVisible() {
      this.drawerVisible = !this.drawerVisible
    },
    hideDrawer() {
      this.drawerVisible = false
    },
  },
  // 数据持久化
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['collapsed'],
      },
    ],
  },
})
