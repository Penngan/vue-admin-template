import '@/style/index.less'
import 'ant-design-vue/dist/antd.css'
import type { Component } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Icons from '@ant-design/icons-vue'

const app = createApp(App)

for (const key in Icons) {
  app.component(key, (Icons as Record<string, Component>)[key])
}

app.use(router).use(store).mount('#app')
