<script setup lang="ts">
</script>

<template>
  <el-scrollbar wrap-class="sim-scroll--wrap" style="height: 100%">
    <router-view />
    <el-backtop class="backTo-top" :bottom="100" :right="20" target=".sim-scroll--wrap" :visibility-height="100"></el-backtop>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}

.backTo-top {
  z-index: 99;
}
</style>
