import type { RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: {
    title?: string
    icon?: string
    hideInMenu?: boolean
    hideChildrenInMenu?: boolean
    affix?: boolean
    groupInMenu?: boolean
  }
  fullPath?: string
  redirect?: string
  children?: AppRouteRecordRaw[]
}
