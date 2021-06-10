<template>
  <h1 class="text-red-400 border">{{ msg }}</h1>
  <button class="btn-indigo"> Click me </button>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
const count = ref(0)
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>
