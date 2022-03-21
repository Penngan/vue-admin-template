<template>
  <div class="divide-x divide-solid flex">
    <div></div>
    <Icon class="!inline-flex items-center h-full px-[10px] cursor-pointer hover:opacity-50" name="reload-outlined" @click="refresh" />
    <Dropdown v-model:visible="visible">
      <Icon class="!inline-flex items-center h-full px-[10px] cursor-pointer hover:opacity-50" name="down-outlined" />
      <template #overlay>
        <Menu @click="handleMenuClcik">
          <template v-for="menu in menuOptions" :key="menu.key">
            <template v-if="menu.key">
              <MenuItem :key="menu.key" :disabled="!!menu.disabled">
                <template #icon>
                  <Icon :name="menu.icon" />
                </template>
                <span>{{ menu.text }}</span>
              </MenuItem>
            </template>
            <MenuDivider v-if="menu.key === 'refresh'" />
          </template>
        </Menu>
      </template>
    </Dropdown>

    <Icon class="!inline-flex items-center h-full px-[10px] cursor-pointer hover:opacity-50" name="expand-outlined" @click="toggleFullScreen" />
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Dropdown, Menu, MenuItem, MenuDivider } from 'ant-design-vue'
  import type { PropType } from 'vue'
  import { computed, ref, watch } from 'vue'
  import type { AppRouteRecordRaw } from '@/router/types'
  import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
  import { useAppStore } from '@/store/modules/app'

  const router = useRouter()
  const route = useRoute()
  const visible = ref(false)
  const appStore = useAppStore()

  const props = defineProps({
    visitedViews: {
      type: Array as PropType<AppRouteRecordRaw[]>,
      default: () => [],
    },
  })

  const canCloseAll = ref(false)
  const canCloseOther = ref(false)
  const canCloseLeft = ref(false)
  const canCloseRight = ref(false)

  watch(visible, (newVal) => {
    if (!newVal) return
    const index = props.visitedViews?.findIndex((view) => view.path === route.fullPath)
    canCloseAll.value = props.visitedViews.filter((view) => !view.meta?.affix).length > 0
    canCloseLeft.value = props.visitedViews?.slice(0, index).filter((view) => !view.meta?.affix).length > 0
    canCloseOther.value = props.visitedViews.filter((view) => !(view.meta?.affix || view.path === route.fullPath)).length > 0
    canCloseRight.value = props.visitedViews?.slice(index + 1).filter((view) => !view.meta?.affix).length > 0
  })
  const menuOptions = computed(() => [
    { key: 'refresh', text: '重新加载', icon: 'reload-outlined' },
    { key: 'close', text: '关闭标签页', icon: 'close-outlined', disabled: route.meta.affix },
    { key: 'closeLeft', text: '关闭左侧标签页', icon: 'vertical-right-outlined', disabled: !canCloseLeft.value },
    { key: 'closeRight', text: '关闭右侧标签页', icon: 'vertical-left-outlined', disabled: !canCloseRight.value },
    { key: 'closeOther', text: '关闭其他标签页', icon: 'pic-center-outlined', disabled: !canCloseOther.value },
    { key: 'closeAll', text: '关闭全部标签页', icon: 'close-circle-outlined', disabled: !canCloseAll.value },
  ])

  const emits = defineEmits(['click'])
  const handleMenuClcik = (e: MenuInfo) => {
    visible.value = false
    emits('click', e.key, route.path)
  }

  const refresh = () => {
    router.replace({
      path: '/redirect' + route.fullPath,
    })
  }
  const toggleFullScreen = () => {
    appStore.toggleShowAside()
    appStore.toggleShowHeader()
  }
</script>
