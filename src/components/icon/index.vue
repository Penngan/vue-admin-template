<template>
  <component :is="name" v-bind="$attrs" :style="iconStyles"></component>
</template>

<script setup lang="ts">
  import type { CSSProperties, PropType } from 'vue'
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
      type: String as PropType<Pick<CSSProperties, 'color'>>,
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
