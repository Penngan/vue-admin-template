import { useUserStore } from '@/store/modules/user'
import { computed } from 'vue'
export function useToken() {
  const userStore = useUserStore()
  return computed({
    get: () => userStore.token,
    set: (value) => {
      if (value) {
        userStore.setToken(value)
      } else {
        userStore.removeToken()
      }
    },
  })
}
