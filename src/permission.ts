import router from '@/router'
import { getToken } from '@/utils/auth'
import { usePermissionStore } from '@/store/modules/permission'

const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const permissStore = usePermissionStore()
  const permissionsRoutes = permissStore.permissionsRoutes
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionsRoutes.length) {
        next()
      } else {
        try {
          await permissStore.getPermissionsRoutes()
          const filteredAsyncRoutes = permissStore.generateRoutes()
          filteredAsyncRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (e) {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      // if (settings.isNeedNprogress) NProgress.done()
    }
  }
})
