import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: '',
      name: '',
      avatar: '',
      introduction: '',
    }
  },
  getters: {},
  actions: {},
})
