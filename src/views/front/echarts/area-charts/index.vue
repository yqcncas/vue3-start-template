<template>
  <v-chart class="chart w-full h-full" :option="option" autoresize />
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  }
})

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.value.map((item: any) => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        data: props.value.map((item: any) => item.value),
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
