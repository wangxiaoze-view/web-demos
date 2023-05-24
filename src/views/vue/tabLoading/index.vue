<script setup >
import { ref, computed } from 'vue';
import { useFetch } from './fetch.js';

const config = [
  { label: 'ID:1', name: 1 },
  { label: 'ID:2', name: 2 },
  { label: 'ID:3', name: 3 },
  { label: 'ID:4', name: 4 },
]

const activeName = ref(1)
const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
const url = computed(() => baseUrl + activeName.value)

const handleChange = (name) => {
  activeName.value = name
}

const { data, error, doFetch } = useFetch(url)


</script>
<template>
  <div class="view-main--container">

    <h2>选项卡切换展示不同的请求状态</h2>
    <blockquote>每次切换选项卡, 或请求loading, error, success三种状态；编写一个kooks解决;</blockquote>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane v-for="(item, index) in config" :key="index" :label="item.label" :name="item.name">

        <el-result v-if="error" icon="error" title="请求失败" :sub-title="`请求失败，错误信息为: ${error.message}`">
          <template #extra>
            <el-button type="primary" @click="doFetch">重新请求</el-button>
          </template>
        </el-result>

        <div v-else-if="data">
          <p>模拟请求的数据为：</p>
          <pre>{{ data }}</pre>
        </div>
        <div v-else v-loading="true" style="height: 400px;" element-loading-text="Loading..."></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<style scoped></style>
