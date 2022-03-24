import type { Ref } from 'vue'
import ECharts from '@/utils/lib/echarts'
import { nextTick, onUnmounted, unref } from 'vue'
import type { EChartsOption } from 'echarts'
import { debounce } from 'lodash'

export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'default') {
  let chartInstance: ECharts.ECharts | null = null

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = ECharts.init(el, theme)
    window.addEventListener('resize', debouncedResize)
  }

  function setOptions(option: EChartsOption) {
    nextTick(() => {
      if (!chartInstance) {
        initCharts()
      }
      chartInstance?.setOption(option)
    })
  }

  const debouncedResize = debounce(resize, 200)
  function resize() {
    chartInstance?.resize()
  }

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    chartInstance?.dispose()
    chartInstance = null
  })

  return {
    setOptions,
    resize,
  }
}
