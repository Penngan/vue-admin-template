import { defineStore } from 'pinia'
import { getPermissionRoutes } from '@/api/permission'
import path from 'path-browserify'

type PermissionRouteItem = {
  path: string
  id: string
  has_permission: boolean
  children?: PermissionRouteItem[]
}

const flat = {}
function flatRoutes(routes: PermissionRouteItem[], parantpath = '') {
  return routes.reduce((prev, curr) => {
    console.log(prev, curr)
    console.log(path.resolve(parantpath, curr.path))
    prev[path.resolve(parantpath, curr.path)] = curr.has_permission
    console.log('prev', prev)
    console.log('------------')
    parantpath = path.resolve(parantpath, curr.path)
    if (curr.children && curr.children.length) {
      flatRoutes(curr.children, parantpath)
    }
    return prev
  }, flat as { [key: string]: boolean })
}
export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    routes: [],
    permissionsRoutes: {} as PermissionRouteItem[],
    flatPermissionsRoutes: {} as Record<string, boolean>,
  }),
  actions: {
    setPermissionsRoutes(payload: PermissionRouteItem[]) {
      this.permissionsRoutes = payload
    },
    async getPermissionsRoutes() {
      const routes = (await getPermissionRoutes()) as unknown as PermissionRouteItem[]
      this.setPermissionsRoutes(routes)
      this.flatPermissionsRoutes = flatRoutes(routes)
      console.log(routes)
      console.log(this.flatPermissionsRoutes)
      return routes
    },
  },
})
