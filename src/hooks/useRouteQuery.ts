import { computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useRouteQuery(name: string, defaultValue?: any) {
  const route = useRoute()
  const router = useRouter()
  return computed<any>({
    get() {
      const data = route.query[name]
      if (data == null) return defaultValue ?? null
      if (Array.isArray(data)) return data.filter(Boolean)
      return data
    },
    set(v) {
      nextTick(() => {
        router.replace({ query: { ...route.query, [name]: v } })
      })
    },
  })
}
