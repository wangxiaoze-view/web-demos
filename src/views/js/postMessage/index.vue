<script setup>
import useLoading from '../../../hooks/loading'
import { IFRAME_URL } from '../../../config/iframe-url.js'
const { post_message } = IFRAME_URL

const { loading, setLoading } = useLoading(true)

setTimeout(() => setLoading(false), 3000)
</script>

<template>
  <div class="view-main--container">
    <blockquote>模拟消息管道，首次打开新标签页，二次在原有的基础上发送监听消息;</blockquote>
    <blockquote class="mt-14">场景：播放音乐首次打开新标签，首页切换音乐或者操作音乐会在打开的标签页上进行切换播放的歌曲！</blockquote>
    <div class="view-main--iframe" v-loading="loading">
      <iframe v-show="!loading" class="view-main--iframe"  :src="post_message" frameborder="0"></iframe>
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
  height: 400px;
}
</style>
