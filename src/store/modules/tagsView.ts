import { defineStore } from 'pinia'
import type { AppRouteRecordRaw } from '@/router/types'

export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: () => ({
    visitedViews: [] as AppRouteRecordRaw[],
  }),
  actions: {
    addView(tag: AppRouteRecordRaw) {
      if (this.visitedViews.some((v) => v.path === tag.path)) return
      this.visitedViews.push(Object.assign({}, tag))
    },
  },
})
