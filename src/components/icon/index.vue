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
      default: 24,
    },
    color: {
      type: String as PropType<Pick<CSSProperties, 'color'>>,
      default: '#000',
    },
  })

  const iconStyles = computed(() => {
    return {
      fontSize: `${props.size}px`,
      color: props.color,
    }
  })
</script>

<style lang="less"></style>
