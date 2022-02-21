<template>
  <Popover trigger="click" style="width: 1000px">
    <div class="px-[10px] cursor-pointer hover:bg-[#f6f6f6] h-full flex items-center">
      <Badge :dot="dot" :count="count">
        <Icon name="bell-outlined" :size="18"></Icon>
      </Badge>
    </div>
    <template #content>
      <Tabs>
        <TabPane v-for="item in list" :key="item.title" :tab="`${item.title}（${item.content.length}）`">
          <List>
            <ListItem v-for="(child, index) in item.content" :key="index">
              <ListItemMeta :description="child.desc">
                <template #title>
                  <span>{{ child.title }}</span>
                </template>
                <template v-if="child.img" #avatar>
                  <img class="w-[30px] h-[30px]" :src="child.img" alt="" />
                </template>
              </ListItemMeta>
            </ListItem>
          </List>
        </TabPane>
      </Tabs>
    </template>
  </Popover>
</template>

<script setup lang="ts">
  import { Popover, Badge, Tabs, TabPane, List, ListItem, ListItemMeta } from 'ant-design-vue'
  import Icon from '@/components/icon/index.vue'
  import type { PropType } from 'vue'
  type ListItemType = {
    title: string
    content: {
      title: string
      time?: string
      img?: string
      desc?: string
      tag?: string
      tagType?: string
    }[]
  }
  defineProps({
    dot: {
      type: Boolean,
      default: false,
    },
    count: {
      type: [String, Number],
    },
    list: {
      type: Array as PropType<ListItemType[]>,
      default: () => [],
    },
  })
</script>
