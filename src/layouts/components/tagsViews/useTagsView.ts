import { ref } from 'vue'
import type { AppRouteRecordRaw } from '@/router/types'
import { constantRoutes } from '@/router'
import { usePermissionStore } from '@/store/modules/permission'
import path from 'path-browserify'

const filterAffixTags = (routes: AppRouteRecordRaw[], basePath = '/') => {
  let tags: AppRouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        ...route,
        path: tagPath,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

export function useTagsView() {
  const visitedViews = ref<AppRouteRecordRaw[]>([])
  const permissionStore = usePermissionStore()

  const addView = (view: AppRouteRecordRaw) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push(Object.assign({}, view))
  }

  const delView = (path: string) => {
    return new Promise((resolve) => {
      const index = visitedViews.value.findIndex((v) => v.path === path)
      if (index !== -1) {
        visitedViews.value.splice(index, 1)
      }
      resolve(visitedViews)
    })
  }

  const delAllview = () => {
    return new Promise((resolve) => {
      visitedViews.value = visitedViews.value.filter((view) => view.meta?.affix)
      resolve(visitedViews)
    })
  }

  const delLeftView = (path: string) => {
    return new Promise((resolve) => {
      const index = visitedViews.value.findIndex((v) => v.path === path)
      if (index !== -1) {
        const leftViews = visitedViews.value.splice(0, index)
        visitedViews.value = leftViews.filter((view) => view.meta?.affix).concat(visitedViews.value)
      }
      resolve(visitedViews)
    })
  }

  const delRightView = (path: string) => {
    return new Promise((resolve) => {
      const index = visitedViews.value.findIndex((v) => v.path === path)
      if (index !== -1) {
        const rightViews = visitedViews.value.splice(index + 1)
        visitedViews.value = rightViews.filter((view) => view.meta?.affix).concat(visitedViews.value)
      }
      resolve(visitedViews)
    })
  }

  const delOtherView = (path: string) => {
    return new Promise((resolve) => {
      visitedViews.value = visitedViews.value.filter((view) => view.meta?.affix || path === view.path)
      resolve(visitedViews)
    })
  }

  const initTag = () => {
    const affixTags = filterAffixTags(constantRoutes.concat(permissionStore.permissionsRoutes))
    for (const tag of affixTags) {
      if (tag.meta && tag.meta.title) {
        addView(tag)
      }
    }
  }

  return {
    visitedViews,
    addView,
    initTag,
    delView,
    delAllview,
    delLeftView,
    delRightView,
    delOtherView,
  }
}
