<script setup >
import Layout from './layout.vue'
const config = {
  size: 'default',
  button: {
    autoInsertSpace: true
  },
  message: {
    max: 10
  }
}
</script>
<template>
  <el-config-provider v-bind="config">
    <Layout />
  </el-config-provider>
</template>



<style scoped></style>
