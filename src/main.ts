import '@/style/index.less'
import 'ant-design-vue/dist/antd.css'
import { Component, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as Icons from '@ant-design/icons-vue'

const app = createApp(App)

for (const key in Icons) {
  app.component(key, (Icons as Record<string, Component>)[key])
}

app.use(router).mount('#app')
