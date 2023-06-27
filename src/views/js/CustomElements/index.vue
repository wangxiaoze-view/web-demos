<script setup>
import useLoading from '../../../hooks/loading'
import { IFRAME_URL } from '../../../config/iframe-url.js'
const { custom_component_url } = IFRAME_URL

const { loading, setLoading } = useLoading(true)

setTimeout(() => setLoading(false), 3000)
</script>

<template>
  <div class="view-main--container">
    <blockquote>如果可视区域较小，可以点击在网页中预览最终效果 <a :href="custom_component_url" target="_blank">去预览</a> </blockquote>
    <div class="view-main--iframe" v-loading="loading">
      <iframe v-show="!loading" class="view-main--iframe"  :src="custom_component_url" frameborder="0"></iframe>
    </div>
  </div>
</template>

<style scoped>
.mt-14 {
  margin-top: 14px;
}
.view-main--iframe {
  padding: 0;
  margin: 20px 0 0 0;
  border: 0;
  width: 100%;
  height: 800px;
}
</style>
