import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './styles/index.css'
import 'element-plus/dist/index.css'
import '@purge-icons/generated'
import VueDragResize from 'vue-drag-resize'

import CustomEcharts from './views/front/echarts'

import ECharts from 'vue-echarts'
import 'echarts'
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

const app = createApp(App)
CustomEcharts(app)
app.component('DraggerBox', VueDragResize)
app.component('VChart', ECharts)
app.use(contextmenu)
app.use(router).use(createPinia()).mount('#app')
