import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppRouteRecordRaw } from '@/router/types'

function isDashboard(route: any) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
export function useBreadcrumb() {
  const route = useRoute()
  return computed(() => {
    const matched = route.matched.filter((item) => item.meta && item.meta.title) as unknown as AppRouteRecordRaw[]
    const first = matched[0]
    if (!isDashboard(first)) {
      matched.unshift({ path: '/dashboard', redirect: '/dashboard', meta: { title: 'Dashboard' } })
    }
    return matched
  })
}
