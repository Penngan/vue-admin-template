import type { Ref } from 'vue'
import ECharts from '@/utils/lib/echarts'
import { unref } from 'vue'
import type { EChartsOption } from 'echarts'

export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'default') {
  console.log(unref(elRef))
  console.log(theme)

  let chartInstance: ECharts.ECharts | null = null

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = ECharts.init(el, theme)
  }

  function setOption(option: EChartsOption) {
    console.log(option)
    if (!chartInstance) {
      initCharts()
    }
  }

  return {
    setOption,
  }
}
