<template>
  <div class="common-layout w-full h-full">
    <el-container class="w-full h-full">
      <el-aside width="auto" class="bg-gray-100">
        <Menu />
      </el-aside>
      <el-container>
        <el-header class="flex justify-between items-center">
          <div class="header-left flex align-items">
            <app-icon
              icon="ant-design:menu-fold-outlined"
              @click="handleCollapse"
              v-if="!store.iconCollapse"
            ></app-icon>

            <app-icon
              icon="ant-design:menu-unfold-outlined"
              @click="handleCollapse"
              v-if="store.iconCollapse"
            ></app-icon>
          </div>
          <div class="header-right">2</div>
        </el-header>
        <el-main>mau {{ store.isCollapse }} </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// import AppIcon from '@/components/app-icon/index.vue'
import { useCollapse } from '@/store/modules/useCollapse'
import Menu from './menu.vue'
const store = useCollapse()
const handleCollapse = () => {
  store.handleCollapse()
}
</script>

<style scoped lang="scss"></style>
