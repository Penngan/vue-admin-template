import router from '@/router'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import { useToken } from '@/hooks/useToken'

const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  const permissStore = usePermissionStore()
  const userStore = useUserStore()
  const permissionsRoutes = permissStore.permissionsRoutes
  const token = useToken()
  if (token.value) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionsRoutes.length) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          await permissStore.getPermissionsRoutes()
          const filteredAsyncRoutes = permissStore.generateRoutes()
          filteredAsyncRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (e) {
          token.value = ''
          next({ path: `/login?redirect=${to.path}` })
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
