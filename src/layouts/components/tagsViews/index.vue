<template>
  <div class="py-[4px] px-[10px] shadow-sm">
    <Tag v-for="item in visitedViews" :key="item.fullPath" :closable="!item.meta.affix" class="!py-[2px] !px-[10px] cursor-pointer">
      {{ item.meta.title }}
    </Tag>
  </div>
</template>
`
<script setup lang="ts">
  import { Tag } from 'ant-design-vue'
  import { onMounted, reactive, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import type { AppRouteRecordRaw } from '@/router/types'
  import { usePermissionStore } from '@/store/modules/permission'
  import { constantRoutes } from '@/router'

  const visitedViews = reactive<AppRouteRecordRaw[]>([])
  const route = useRoute()
  const permissionStore = usePermissionStore()

  const filterAffixTags = (routes: AppRouteRecordRaw[]) => {
    let tags: AppRouteRecordRaw[] = []
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        tags.push(route)
      }
      if (route.children && route.children.length) {
        const tempTags = filterAffixTags(route.children)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }

  const initTag = () => {
    const affixTags = filterAffixTags(constantRoutes.concat(permissionStore.permissionsRoutes))
    for (const tag of affixTags) {
      if (tag.meta && tag.meta.title) {
        visitedViews.push(tag)
      }
    }
  }

  onMounted(() => {
    initTag()
  })
  watch(
    () => route.path,
    () => {
      visitedViews.push(Object.assign({}, route) as unknown as AppRouteRecordRaw)
    }
  )
</script>

<style lang="less"></style>
