import { defineStore } from 'pinia'
import { getPermissionRoutes } from '@/api/permission'
import path from 'path-browserify'
import { asyncRoutes, constantRoutes } from '@/router'
import type { MenuItem } from '@/components/menu/types'
import type { AppRouteRecordRaw } from '@/router/types'

type PermissionRouteItem = {
  path: string
  id: string
  has_permission: boolean
  children?: PermissionRouteItem[]
}

function flatRoutes(routes: PermissionRouteItem[]) {
  const result: Record<string, boolean> = {}
  function handleRoute(routes: PermissionRouteItem[], parentPath: string) {
    routes.forEach((route) => {
      result[path.resolve(parentPath, route.path)] = route.has_permission
      if (route.children) {
        handleRoute(route.children, path.resolve(parentPath, route.path))
      }
    })
  }
  handleRoute(routes, '/')
  return result
}

function filterRoutesByPermissionArray(flatPermissionsRoutes: Record<string, boolean>, asyncRoutes: AppRouteRecordRaw[], parentPath = '/') {
  const filteredAsyncRoutes: AppRouteRecordRaw[] = []
  asyncRoutes.forEach((route) => {
    const fullPath = path.resolve(parentPath, route.path)
    route.fullPath = fullPath
    if (flatPermissionsRoutes[fullPath] || flatPermissionsRoutes[fullPath] === undefined) {
      if (route.children && route.children.length) {
        route.children = filterRoutesByPermissionArray(flatPermissionsRoutes, route.children, fullPath)
      }
      filteredAsyncRoutes.push(route)
    }
  })
  return filteredAsyncRoutes
}

function generateRoutes(routes: AppRouteRecordRaw[], parentPath = '/'): MenuItem[] {
  return routes
    .map((route) => {
      if (!route.hideInMenu) {
        if (route.hideChildrenInMenu && route.children && route.children.length === 1) {
          return {
            title: route.children[0].meta?.title ?? '',
            icon: route.children[0].meta?.icon ?? '',
            path: path.resolve(route.path, route.children[0].path),
          }
        } else {
          return {
            title: route.meta?.title ?? '',
            icon: route.meta?.icon ?? '',
            path: path.resolve(parentPath, route.path),
            group: route.meta?.groupInMenu ?? false,
            ...(route.children && {
              children: generateRoutes(route.children, path.resolve(parentPath, route.path)),
            }),
          }
        }
      }
    })
    .filter(Boolean) as MenuItem[]
}
export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    routes: [] as MenuItem[],
    permissionsRoutes: {} as AppRouteRecordRaw[],
    flatPermissionsRoutes: {} as Record<string, boolean>,
  }),
  actions: {
    setPermissionsRoutes(payload: AppRouteRecordRaw[]) {
      this.permissionsRoutes = payload
    },
    reovePermissionsRoutes() {
      this.routes = []
      this.permissionsRoutes = []
      this.flatPermissionsRoutes = {}
    },
    async getPermissionsRoutes() {
      const routes = (await getPermissionRoutes()) as unknown as PermissionRouteItem[]
      this.flatPermissionsRoutes = flatRoutes(routes)
      const filteredAsyncRoutes = filterRoutesByPermissionArray(this.flatPermissionsRoutes, asyncRoutes)
      this.setPermissionsRoutes(filteredAsyncRoutes)
      return routes
    },
    generateRoutes() {
      this.routes = generateRoutes(constantRoutes.concat(this.permissionsRoutes))
    },
  },
})
