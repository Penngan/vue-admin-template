<template>
  <h1 class="text-red-400">{{ msg }}</h1>
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

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
