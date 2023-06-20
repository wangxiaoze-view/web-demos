<script setup>
import { ref } from 'vue'
import useLoading from '@/hooks/loading'
import useTrackMap from '@/hooks/proxyMap';
import { hanlderErrorMap } from '@/hooks/error';

// http to proxy
import http from '@/http/index'
import { HTTP_API_URL } from '@/config/http-url.js'

// hooks
const { loading, setLoading } = useLoading(false)
const { set, get, mapClear } = useTrackMap()
const errorMap = hanlderErrorMap()

// axios map key
const map_key = 'AXIOS_MAP_KEY'

const data = ref(null)
const id = ref(0)

// handler Functions
const handlerAxios = async (debounce = false) => {
  try {
    id.value++;
    mapClear()
    set(map_key, debounce ? { debounce: true } : { throttling: true })
    setLoading(true)
    const result = await http.get(`${HTTP_API_URL.typicode_todos}/${id.value}`, get(map_key))
    if (result.data) {
      setLoading(false)
      data.value = result.data
    }
  } catch (error) {
    console.log(error)
    errorMap.set(error.message, error)
    setLoading(false)
    id.value--;
    if (id.value < 1) id.value = 0
  }
}
</script>
<template>
  <div class="view-main--container">
    <el-button type="primary" @click="handlerAxios(true)" :loading="loading" :disabled="loading">防抖</el-button>
    <el-button type="primary" @click="handlerAxios(false)" :loading="loading" :disabled="loading">节流</el-button>
    <div class="content-container" v-loading="loading">
      <pre v-show="data">
        {{ data }}
      </pre>
    </div>
  </div>
</template>
<style scoped></style>
