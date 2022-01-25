import { useUserStore } from '@/store/modules/user'

export const getToken = () => {
  const userStore = useUserStore()
  return userStore.token
}

export const setToken = (token: string) => {
  const userStore = useUserStore()
  userStore.setToken(token)
}

export const removeToken = () => {
  const userStore = useUserStore()
  userStore.removeToken()
}
