import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/components/menu/types'
import path from 'path-browserify'

const generateMenu = (routes: RouteRecordRaw[], parentPath = '/'): MenuItem[] => {
  return routes
    .map((route) => {
      if (!route.meta?.hideInMenu) {
        if (route.meta?.hideChildrenInMenu && route.children && route.children.length === 1) {
          return {
            title: route.meta?.title ?? '',
            icon: route.meta?.icon ?? '',
            path: path.resolve(route.path, route.children[0].path),
          }
        } else {
          return {
            title: route.meta?.title ?? '',
            icon: route.meta?.icon ?? '',
            path: path.resolve(parentPath, route.path),
            group: route.meta?.groupInMenu ?? false,
            ...(route.children && {
              children: generateMenu(route.children, path.resolve(parentPath, route.path)),
            }),
          }
        }
      }
    })
    .filter(Boolean) as MenuItem[]
}

export default function useRouterToMenu(routes: RouteRecordRaw[]) {
  return generateMenu(routes)
}
