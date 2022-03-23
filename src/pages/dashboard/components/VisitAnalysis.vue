<template>
  <div ref="chartRef"></div>
</template>

<script setup lang="ts">
  import { useECharts } from '@/hooks/useECharts'
  import type { Ref } from 'vue'
  import { ref } from 'vue'

  const chartRef = ref<HTMLDivElement | null>(null)
  useECharts(chartRef as Ref<HTMLDivElement>)
</script>

<style lang="less"></style>
