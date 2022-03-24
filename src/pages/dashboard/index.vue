<template>
  <div>
    <GrowCard :loading="loading" />
    <VisitAnalysis class="!my-[16px]" :loading="loading" />
    <div class="md:flex">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 w-full md:!mx-[16px] md:!my-0 !my-[16px]" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import GrowCard from './components/GrowCard.vue'
  import VisitAnalysis from './components/VisitAnalysis.vue'
  import VisitRadar from './components/VisitRadar.vue'
  import VisitSource from './components/VisitSource.vue'
  import SalesProductPie from './components/SalesProductPie.vue'
  import { ref } from 'vue'

  const loading = ref(true)

  setTimeout(() => {
    loading.value = false
  }, 1500)
</script>
