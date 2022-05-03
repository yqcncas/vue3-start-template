import { App } from 'vue'
import AreaCharts from './area-charts/index.vue'

import BarCharts from './bar-charts/index.vue'

import CustomText from './custom-text/index.vue'

import CustomVideo from './custom-video/index.vue'

export default (app: App) => {
  app.component('AreaCharts', AreaCharts)
  app.component('BarCharts', BarCharts)
  app.component('CustomText', CustomText)
  app.component('CustomVideo', CustomVideo)
}
