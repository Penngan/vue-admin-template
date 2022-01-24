import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

export const getToken = () => {
  return userStore.token
}

export const setToken = (token: string) => {
  userStore.setToken(token)
}

export const removeToken = () => {
  userStore.removeToken()
}
