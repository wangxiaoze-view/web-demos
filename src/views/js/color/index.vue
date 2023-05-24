<script lang="ts" setup>
  import {ref} from 'vue';
  import { ElNotification } from 'element-plus'
  const color = ref('')

  const loading = ref(false)

  const openEyeDropper = async () => {
    loading.value = !loading.value
    try {
      const dropper = new EyeDropper();
      const result = await dropper.open();
      color.value = result.sRGBHex;
    } catch (error) {
      console.log('')
      ElNotification({
        title: 'Warning',
        message: '用户已取消',
        type: 'warning',
      })
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="view-main--container">
    <img src="https://qiniu.wangxiaoze.wang/hexo-blog/default_top_img.webp" alt="">
    <div class="color-container">
        <el-button type="primary" @click="openEyeDropper" :loading="loading" :disabled="loading">取色</el-button>
        <div class="color-bg" :style="{backgroundColor: color}"></div>
        <div class="color-txt">{{ color }}</div>
    </div>
  </div>
</template>

<style scoped>

.view-main--container {
    position: relative;
}
img {
    width: 100%;
    height: 100%;
}

.color-container {
    position: absolute;
    right: 50px;
    top: 60px;
    display: flex;
    flex-direction: column;
    align-items: end;
}

.color-bg {
    width: 64px;
    height: 64px;
    margin: 14px 0 14px 0;
    padding: 0;
    border-radius: 4px;
    background-color: #fff;
}

.color-txt {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 4px 4px #000;
}
</style>
