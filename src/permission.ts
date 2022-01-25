import router, { asyncRoutes } from '@/router'
import { getToken } from '@/utils/auth'
import store from './store'
import { usePermissionStore } from '@/store/modules/permission'

console.log(asyncRoutes)
const permissStore = usePermissionStore(store)
const flatPermissionsRoutes = permissStore.flatPermissionsRoutes
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (Object.keys(flatPermissionsRoutes).length > 0 && flatPermissionsRoutes[to.path]) {
        next()
      } else {
        try {
          const routes = await permissStore.getPermissionsRoutes()
          console.log(routes)
        } catch (e) {
          console.log(e)
        }
        next()
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
