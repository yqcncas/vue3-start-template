<template>
  <div
    class="dragger-box w-full h-full flex justify-between"
    @mousedown="hideContext"
  >
    <div class="left h-full bg-gray-100 w-2/12">
      <!-- <div
        draggable="true"
        @mousedown="onWidgetMouseDown($event, item)"
        v-for="item in widgetList"
        :key="item.type"
      >
        {{ item.label }}
      </div> -->
      <widget
        :widget-list="widgetList"
        @onWidgetMouseDown="onWidgetMouseDown"
      />
    </div>
    <div
      class="right h-full bg-white flex-1 relative custom-grid"
      ref="pinelRef"
      @dragover="(e) => e.preventDefault()"
      @drop.stop.prevent="handleDrop"
    >
      <dragger-box
        class="bg-white absolute text-white"
        v-for="(item, index) in list"
        :key="item.id"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :z="item.z"
        :is-active="item.focused"
        :grid="CONFIG.LAYOUTCONFIG.stageGrid"
        @contextmenu.prevent="showContext($event, item)"
        @click="focusWidget(item)"
        ref="widgetRef"
        @drop.stop="handleDrop($event, index)"
        @dragging="handleDragging"
      >
        <!-- {{ item.name }} -->
        <!-- <component :is="item.component">{{ item.component }}</component> -->
        <component
          :is="item.component"
          :value="item.value"
          class="w-full h-full"
        />
      </dragger-box>
    </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="onLayerTop">置顶</v-contextmenu-item>
      <v-contextmenu-item @click="onLayerBottom">置底</v-contextmenu-item>
      <v-contextmenu-item @click="onLayerUp">上移图层</v-contextmenu-item>
      <v-contextmenu-item @click="onLayerDown">下移图层</v-contextmenu-item>
      <v-contextmenu-item @click="onLayerRemove">删除</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { buildUUID } from '@/utils/uuid'
import Widget from './components/widget.vue'
import * as CONFIG from './constant/config'

onMounted(() => {
  document.addEventListener('keydown', (e: any) => {
    console.log(e)
    if (e.metaKey && e.key === 'z' && !e.shiftKey) {
      const reverListHistory: any = recordList.value.pop()
      recordListRever.value.push(reverListHistory)

      list.value = recordList.value[recordList.value.length - 1] || []
    }
    if (e.metaKey && e.key === 'z' && e.shiftKey) {
      list.value = recordListRever.value.pop()
      recordList.value.push(list.value)
    }
  })
})

const recordList = ref<CONFIG.Widget[]>([]) // 记录数据
const recordListRever = ref<CONFIG.Widget[]>([]) // 反撤回数据
const widgetX = ref<number>(0) // 为了解决组件拖上来 有点偏差
const widgetY = ref<number>(0) // 为了解决组件拖上来 有点偏差
const widgetName = ref<string>('')
const pinelRef = ref<HTMLDivElement | null>(null)

const widgetList = ref(CONFIG.WIDGETLIST)

const list: any = ref([]) // 右侧数据
const contextmenu = ref<any>(null)
const widgetRef = ref<any>(null)
// 添加数据 且聚焦
const handleDrop = (e: MouseEvent, index?: number) => {
  // console.log(e.target, pinelRef.value)
  // console.log(index)
  contextmenu.value.hide()
  let x = e.offsetX - widgetX.value
  let y = e.offsetY - widgetY.value
  // console.log(e)
  if (e.target !== pinelRef.value && index !== undefined) {
    // console.log(index)
    console.log(widgetRef.value[index as number].$el)
    x =
      widgetRef.value[index as number].$el.offsetLeft +
      e.offsetX -
      widgetX.value

    y =
      widgetRef.value[index as number].$el.offsetTop + e.offsetY - widgetY.value
  }

  const item = {
    id: buildUUID(),
    x,
    y,
    name: widgetName.value,
    focused: false,
    // w: findDefault(widgetName.value).w,
    // h: findDefault(widgetName.value).h
    // 使其后来的层级是最高的
    z: list.value.length
      ? Math.max(...list.value.map((item: any) => item.z)) + 1
      : 0,
    ...findDefault(widgetName.value)
  }
  list.value.push(item)
  recordList.value.push(list.value.concat()) // 新增数据时 添加到记录里 因为是同个地址 要concat一下
  focusWidget(item)
}
// 鼠标放开
const onWidgetMouseDown = (e: MouseEvent, widget: any) => {
  widgetX.value = e.offsetX
  widgetY.value = e.offsetY
  widgetName.value = widget.label
}
// 找到对应的配置项内容
const findDefault = (label: string) => {
  return (widgetList.value as any).find(
    (item: CONFIG.Widget) => item.label === label
  ).default
}

// 隐藏右键图层
const hideContext = () => {
  // contextmenu.value.hide()
}
// 显示右键弹框
const showContext = (e: Event, item: any) => {
  contextmenu.value.show(e)
  focusWidget(item)
}
// 点击图层聚焦
const focusWidget = (item: any) => {
  for (const item of list.value) {
    item.focused = true
  }
  item.focused = true
}
// 置底
const onLayerBottom = () => {
  list.value.forEach((item: any) => {
    item.z = item.z + 1
  })
  const currentWidget = list.value.find(
    (item: { focused: boolean }) => item.focused
  )
  currentWidget.z = 0
}

const onLayerTop = () => {
  const currentWidget = list.value.find(
    (item: { focused: boolean }) => item.focused
  )
  currentWidget.z = Math.max(...list.value.map((item: any) => item.z)) + 1
}
const onLayerUp = () => {
  const currentWidget = list.value.find(
    (item: { focused: boolean }) => item.focused
  )
  currentWidget.z++
  const upStairs = list.value.find((item: any) => item.z === currentWidget.z)
  upStairs.z--
}
const onLayerDown = () => {
  const currentWidget = list.value.find(
    (item: { focused: boolean }) => item.focused
  )
  currentWidget.z--
  if (currentWidget.z < 0) {
    currentWidget.z = 0
  }
  const upStairs = list.value.find((item: any) => item.z === currentWidget.z)
  upStairs.z++
}
const onLayerRemove = () => {
  list.value = list.value.filter((item: any) => !item.focused)
}
const handleDragging = (info: any) => {
  // console.log('执行了')
  console.log(info)
  list.value.forEach((item: any) => {
    if (item.focused) {
      console.log(item.x)
      // item.x = info.left + item.x
      // item.y = info.top + item.y
    }
  })
}
</script>

<style scoped lang="scss">
.custom-grid {
  background-color: #f5f7fa;
  background: linear-gradient(-90deg, #dcdcdc 2px, transparent 2px) 0% 0%/20px
      20px,
    linear-gradient(#dcdcdc 2px, transparent 2px) 0% 0%/20px 20px;
  // transform: scale(1) translate(-50%, -50%);
}
</style>
