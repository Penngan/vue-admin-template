import router from '@/router'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import { useToken } from '@/hooks/useToken'
import getPageTitle from '@/utils/getPageTitle'
import setting from '@/setting'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  console.log(to)
  if (setting.isNeedNprogress) NProgress.start()
  document.title = getPageTitle(to.meta.title as string)
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
          console.log(1)
          await userStore.getUserInfo()
          await permissStore.getPermissionsRoutes()
          await permissStore.generateRoutes()
          permissStore.permissionsRoutes.forEach((route) => {
            console.log(2)
            router.addRoute(route)
          })
          console.log(3)
          next({ ...to, replace: true })
        } catch (e) {
          token.value = ''
          next({ path: `/login?redirect=${to.path}` })
          if (setting.isNeedNprogress) NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      if (setting.isNeedNprogress) NProgress.done()
    }
  }
})

router.afterEach(() => {
  if (setting.isNeedNprogress) NProgress.done()
})
