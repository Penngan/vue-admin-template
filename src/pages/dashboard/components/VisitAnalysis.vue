<template>
  <Card title="流量趋势" :loading="loading">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>

<script setup lang="ts">
  import { useECharts } from '@/hooks/useECharts'
  import type { Ref } from 'vue'
  import { ref, watch } from 'vue'
  import { Card } from 'ant-design-vue'

  const props = defineProps({
    height: {
      type: String,
      default: '300px',
    },
    width: {
      type: String,
      default: '100%',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

  watch(
    () => props.loading,
    () => {
      if (props.loading) return
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            data: [111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222, 11111, 4000, 2000, 500, 3323],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
          },
          {
            smooth: true,
            data: [33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390, 198, 60, 30, 22, 11],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#019680',
            },
          },
        ],
      })
    }
  )
</script>

<style lang="less"></style>
