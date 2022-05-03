<template>
  <div
    draggable="true"
    @mousedown="onWidgetMouseDown($event, item)"
    v-for="item in props.widgetList"
    :key="item.type"
  >
    {{ item.label }}
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

interface Widget {
  type: string
  label: string
}
const props = defineProps({
  widgetList: {
    type: Array as PropType<Widget[]>,
    required: true
  }
})
const emits = defineEmits(['onWidgetMouseDown'])
const onWidgetMouseDown = (e: Event, widget: Widget) => {
  emits('onWidgetMouseDown', e, widget)
}
</script>

<style scoped></style>
