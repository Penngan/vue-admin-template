import { computed } from 'vue'
import type { RouteLocationMatched } from 'vue-router'
import { useRoute } from 'vue-router'

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
    const matched = route.matched.filter((item) => item.meta && item.meta.title)
    const first = matched[0]
    if (!isDashboard(first)) {
      matched.unshift({ path: '/dashboard', meta: { title: 'Dashboard' } } as unknown as RouteLocationMatched)
    }
    return matched
  })
}
