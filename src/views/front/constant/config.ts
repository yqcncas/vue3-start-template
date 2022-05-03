import * as dft from './default'

export interface Widget {
  type: string
  label: string
  default?: {
    w: number
    h: number
    component: string
    value?: any[] | string
  }
}

export const WIDGETLIST: Widget[] = [
  {
    type: 'area-charts',
    label: '面积图',
    default: dft.AREA_CHART
  },
  {
    type: 'bar-charts',
    label: '柱形图',
    default: dft.BAR_CHART
  },
  {
    type: 'custom-text',
    label: '文字',
    default: dft.TEXT
  },
  {
    type: 'custom-video',
    label: '视频',
    default: dft.VIDEO
  }
]

export const LAYOUTCONFIG = {
  stageWidth: 1920, // 舞台-宽度 宽:高=16:9
  stageHeight: 1080, // 舞台-高度
  stageGrid: 20, // 舞台-网格尺寸
  widgetMinWidth: 240, // 组件-最小宽度
  widgetMinHeight: 120 // 组件-最小高度
}
