import { useUserStore } from '@/store/modules/user'
import store from '@/store'

const userStore = useUserStore(store)

export const getToken = () => {
  return userStore.token
}

export const setToken = (token: string) => {
  userStore.setToken(token)
}

export const removeToken = () => {
  userStore.removeToken()
}
