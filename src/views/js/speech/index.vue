<script setup>
import useLoading from '../../../hooks/loading'
import { IFRAME_URL } from '../../../config/iframe-url.js'
const { speech_url } = IFRAME_URL

const { loading, setLoading } = useLoading(true)

setTimeout(() => setLoading(false), 3000)
</script>

<template>
  <div class="view-main--container">
    <blockquote>模拟语音合成技术，点击按钮播放语音，语音转文字可能诸多因素导致不可用 <a :href="speech_url" target="_blank">点击在环境中查看</a> </blockquote>
    <div class="view-main--iframe" v-loading="loading">
      <iframe v-show="!loading" class="view-main--iframe"  :src="speech_url" frameborder="0"></iframe>
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
  height: 600px;
}
</style>
