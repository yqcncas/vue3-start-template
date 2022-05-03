<template>
  <div class="text-black">{{ props.value }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
</script>

<style scoped></style>
