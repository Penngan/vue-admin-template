import { defineStore } from 'pinia'
import { getInfo, login, logout } from '@/api/user'
import { usePermissionStore } from '@/store/modules/permission'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: '',
      name: '',
      avatar: '',
      introduction: '',
      roles: [],
    }
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    removeToken() {
      this.token = ''
    },
    async login(data: Record<string, string>) {
      const { token } = (await login(data)) as any
      this.token = token
    },
    async logout() {
      await logout()
      this.removeToken()
      const permissionStore = usePermissionStore()
      permissionStore.reovePermissionsRoutes()
    },
    async getUserInfo() {
      const data: any = await getInfo(1)
      this.name = data.name
      this.avatar = data.avatar
      this.roles = data.roles
    },
  },
  // 数据持久化
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['token'],
      },
    ],
  },
})
