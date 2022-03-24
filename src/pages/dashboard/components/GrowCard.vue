<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :title="item.title"
        class="md:w-1/4 md:!mt-0"
        :loading="loading"
        :class="{ 'md:!mr-[16px]': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>
        <div class="flex justify-between p-[10px]">
          <CountTo :start-val="1" :end-val="item.value" prefix="$" class="text-2xl" />
          <Icon :name="item.icon" size="28" :color="item.color" />
        </div>
        <div class="flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo :start-val="1" :end-val="item.total" prefix="$" />
        </div>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Card, Tag } from 'ant-design-vue'
  import Icon from '@/components/Icon/index.vue'
  import CountTo from '@/components/countTo/index.vue'
  import { growCardList } from '../data'

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style lang="less"></style>
