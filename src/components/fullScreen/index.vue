<template>
  <div class="px-[10px] cursor-pointer hover:bg-[#f6f6f6] h-full flex items-center">
    <Icon v-if="!isFullscreen" name="fullscreen-outlined" @click="toggleFullScreen" />
    <Icon v-else name="fullscreen-exit-outlined" @click="toggleFullScreen" />
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue'
  import screenfull from 'screenfull'
  import { message } from 'ant-design-vue'
  import { onMounted, ref } from 'vue'

  const isFullscreen = ref(false)

  const toggleFullScreen = () => {
    if (!screenfull.isEnabled) {
      message.warning({
        content: 'you browser can not work',
      })
      return false
    }
    screenfull.toggle()
  }

  onMounted(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        isFullscreen.value = !isFullscreen.value
      })
    }
  })
</script>
