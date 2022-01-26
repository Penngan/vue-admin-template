import { defineStore } from 'pinia'
import { getInfo } from '@/api/user'

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
