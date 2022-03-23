<template>
  <span :style="{ color }">{{ value }}</span>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, unref, watch } from 'vue'
  import { useTransition, TransitionPresets } from '@vueuse/core'
  import { isNumber } from '@/utils/util'

  const props = defineProps({
    startVal: { type: Number, default: 0 },
    endVal: { type: Number, default: 100 },
    duration: { type: Number, default: 1500 },
    transition: { type: String, default: 'linear' },
    decimals: {
      type: Number,
      default: 0,
      validator(value: number) {
        return value >= 0
      },
    },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    separator: { type: String, default: ',' },
    decimal: { type: String, default: '.' },
    color: { type: String },
  })

  const emits = defineEmits(['onStarted', 'onFinished'])
  const source = ref(props.startVal)
  let output = useTransition(source)

  const value = computed(() => formatNumber(unref(output)))

  onMounted(() => {
    run()
    source.value = props.endVal
  })

  watch([() => props.startVal, () => props.endVal], ([newStartVal, newEndVal]) => {
    source.value = newStartVal
    run()
    source.value = newEndVal
  })

  function run() {
    output = useTransition(source, {
      duration: props.duration,
      onFinished: () => emits('onFinished'),
      onStarted: () => emits('onStarted'),
      transition: TransitionPresets[props.transition],
    })
  }

  function formatNumber(num: number | string) {
    if (!num && num !== 0) {
      return ''
    }
    const { decimals, decimal, separator, suffix, prefix } = props
    num = Number(num).toFixed(decimals)
    num += ''

    const x = num.split('.')
    let x1 = x[0]
    const x2 = x.length > 1 ? decimal + x[1] : ''

    const rgx = /(\d+)(\d{3})/
    if (separator && !isNumber(separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2')
      }
    }
    return prefix + x1 + x2 + suffix
  }
</script>
