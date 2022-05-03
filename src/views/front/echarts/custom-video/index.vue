<template>
  <div>
    <videoPlay
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const options = computed(() => {
  return {
    width: '100%', // 播放器高度
    height: '100%', // 播放器高度
    color: '#409eff', // 主题色
    currentTime: 0,
    // autoPlay: true,
    // speed: false, // 关闭进度条拖动
    title: '', // 视频名称
    src: props.value // 视频源
  }
})

// const options = ref({
//   width: '100%', // 播放器高度
//   height: '100%', // 播放器高度
//   color: '#409eff', // 主题色
//   currentTime: 0,
//   // autoPlay: true,
//   // speed: false, // 关闭进度条拖动
//   title: '', // 视频名称
//   src: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4' // 视频源
// })
</script>

<style scoped></style>
