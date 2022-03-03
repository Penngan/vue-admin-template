<template>
  <div class="tags-view-wrapper">
    <Tabs type="editable-card" size="small" :animated="false" :hide-add="true" :active-key="$route.path" @edit="handleClose" @tab-click="handleClick">
      <template v-for="item in visitedViews" :key="item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <span>{{ item.meta?.title }}</span>
          </template>
        </TabPane>
      </template>
      <template #rightExtra>
        <TagsOperation :visited-views="visitedViews" @click="handleOperation" />
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
  import { Tabs, TabPane } from 'ant-design-vue'
  import type { Ref } from 'vue'
  import { onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTagsView } from '@/layouts/components/tagsViews/useTagsView'
  import type { AppRouteRecordRaw } from '@/router/types'
  import TagsOperation from './tagsOperation.vue'

  const route = useRoute()
  const router = useRouter()
  const { visitedViews, addView, initTag, delView, delAllview, delLeftView, delRightView, delOtherView } = useTagsView()
  onMounted(() => {
    initTag()
    if (route.name) {
      addView(route as unknown as AppRouteRecordRaw)
    }
  })

  const handleClose = (path: string) => {
    delView(path).then((visitedViews) => {
      if (path === route.path) {
        const latestView = (visitedViews as Ref<AppRouteRecordRaw[]>).value.slice(-1)[0]
        if (latestView) {
          router.push(latestView.path)
        }
      }
    })
  }
  const handleClick = (path: string) => {
    router.push(path)
  }

  const handleOperation = (type: string, path: string) => {
    switch (type) {
      case 'refresh':
        router.replace({
          path: '/redirect' + route.fullPath,
        })
        break
      case 'close':
        delView(path).then((visitedViews) => {
          if (path === route.path) {
            const latestView = (visitedViews as Ref<AppRouteRecordRaw[]>).value.slice(-1)[0]
            if (latestView) {
              router.push(latestView.path)
            }
          }
        })
        break
      case 'closeLeft':
        delLeftView(path)
        break
      case 'closeRight':
        delRightView(path)
        break
      case 'closeOther':
        delOtherView(path)
        break
      case 'closeAll':
        delAllview().then((visitedViews) => {
          const latestView = (visitedViews as Ref<AppRouteRecordRaw[]>).value.slice(-1)[0]
          if (latestView) {
            router.push(latestView.path)
          }
        })
        break
      default:
        break
    }
  }

  watch(
    () => route.path,
    () => {
      if (route.name) {
        addView(route as unknown as AppRouteRecordRaw)
      }
    }
  )
</script>

<style lang="less">
  .tags-view-wrapper {
    z-index: 10;
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #e2e8f0;
    .ant-tabs-small {
      height: 30px;
    }
    .ant-tabs.ant-tabs-card {
      .ant-tabs-nav {
        padding-top: 2px;
        height: 30px;
        margin: 0;
        background-color: #fff;
        border: 0;
        box-shadow: none;
        .ant-tabs-nav-container {
          height: 30px;
          padding-top: 2px;
        }

        .ant-tabs-tab {
          height: calc(30px - 2px);
          padding-right: 12px;
          line-height: calc(30px - 2px);
          background-color: #fff;
          transition: none;

          &:hover {
            .ant-tabs-tab-remove {
              opacity: 1;
            }
          }

          .ant-tabs-tab-remove {
            width: 8px;
            height: 28px;
            font-size: 12px;
            color: inherit;
            opacity: 0;
            transition: none;
            margin-left: 4px;
            margin-right: -4px;
            display: flex;
            align-items: center;
            &:hover {
              svg {
                width: 0.8em;
              }
            }
          }

          svg {
            fill: #000;
          }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active) {
          &:hover {
            color: #41b983;
          }
        }

        .ant-tabs-tab-active {
          position: relative;
          padding-left: 18px;
          background: #41b983;
          border: 0;
          transition: none;
          span {
            color: #fff !important;
          }

          .ant-tabs-tab-remove {
            opacity: 1;
          }

          svg {
            width: 0.7em;
            fill: #fff;
          }
        }
      }

      .ant-tabs-nav > div:nth-child(1) {
        padding: 0 6px;

        .ant-tabs-tab {
          margin-right: 3px !important;
        }
      }
    }

    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      .anticon-close {
        font-size: 12px;

        svg {
          width: 0.6em;
        }
      }
    }
  }
</style>
