<template>
  <component :is="name" v-bind="$attrs" :style="iconStyles"></component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
    },
    color: {
      type: String,
    },
  })

  const iconStyles = computed(() => {
    return {
      ...(props.size && { fontSize: `${props.size}px` }),
      ...(props.color && { color: props.color }),
    }
  })
</script>

<style lang="less"></style>
