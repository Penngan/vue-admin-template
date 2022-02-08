<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="item in breadcrumbList" :key="item.path" :href="item.path" @click="handleLink(item)">{{ item.meta.title }}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script setup lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue'
  import { useBreadcrumb } from '@/components/breadcrumb/useBreadcrumb'
  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'
  const breadcrumbList = useBreadcrumb()
  const router = useRouter()
  const handleLink = (item: RouteLocationMatched) => {
    const { redirect, path } = item
    if (redirect) {
      router.push(redirect as string)
      return
    }
    router.push(path)
  }
</script>

<style lang="less"></style>
