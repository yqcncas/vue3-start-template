<template>
  <!-- <div>bar-cha</div> -->
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
      data: props.value.map((item: any) => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.value.map((item: any) => item.value),
        // data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
// const option = ref({
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [150, 230, 224, 218, 135, 147, 260],
//       type: 'line'
//     }
//   ]
// })
// option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [120, 200, 150, 80, 70, 110, 130],
//       type: 'bar',
//       showBackground: true,
//       backgroundStyle: {
//         color: 'rgba(180, 180, 180, 0.2)'
//       }
//     }
//   ]
// }
</script>

<style scoped></style>
