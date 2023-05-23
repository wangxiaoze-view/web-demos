<script setup lang="ts">
import containerApp from './layout/components/containerApp.vue'
</script>

<template>
  <el-scrollbar>
    <containerApp />
    <el-backtop :right="100" :bottom="100" />
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
