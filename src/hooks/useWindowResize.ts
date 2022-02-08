import { onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'

export function useWindowResize() {
  const isMobile = ref(false)
  const WIDTH = 992
  const appStore = useAppStore()
  const resizeHandler = () => {
    isMobile.value = document.body.getBoundingClientRect().width - 1 < WIDTH
    appStore.hideDrawer()
    appStore.toggleDevice(isMobile.value ? 'mobile' : 'desktop')
  }
  onMounted(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
