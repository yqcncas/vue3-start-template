<template>
  <div>
    <span class="iconify text-xl cursor-pointer" :data-icon="props.icon"></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss"></style>
