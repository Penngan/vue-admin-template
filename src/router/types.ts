import type { RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: {
    title?: string
    icon?: string
    affix?: boolean
    groupInMenu?: boolean
  }
  hideInMenu?: boolean
  hideChildrenInMenu?: boolean
  fullPath?: string
  redirect?: string
  children?: AppRouteRecordRaw[]
}
