<script setup>
import {computed, ref, watchEffect} from 'vue'

// local key
const THEME_KEY = '__THEME_KEY__'

// parent ref
const parentRef = ref()

// label list
const selectList = [
  {label: '跟随系统', value: 'os'},
  {label: '亮色', value: 'light'},
  {label: '暗色', value: 'dark'},
]

// init select value
const selectVal = ref(localStorage.getItem(THEME_KEY) || 'os')

// set select value
const initSetSelectVal = () => {
  selectVal.value = 'os'
  localStorage.setItem(THEME_KEY, selectVal.value)
}

// computed to getLabel
const getSelectLabel = computed(() => {
  const getLabel = selectList.find(item => item.value === selectVal.value)
  return getLabel ? getLabel.label : '-'
})

// computed to matchMedia
const math = matchMedia('(prefers-color-scheme: dark)')

// follower to os
const followerOs = () => {
  parentRef.value.dataset.theme = math.matches ? 'dark' : 'light'
}


// watch
watchEffect(() => {
  if (!parentRef.value) return;
  localStorage.setItem(THEME_KEY, selectVal.value)
  if (selectVal.value === 'os') {
    followerOs();
    math.addEventListener('change', followerOs)
  } else {
    parentRef.value.dataset.theme = selectVal.value
    math.removeEventListener('change', followerOs)
  }
})


</script>

<template>
<div class="view-main--container  ">
  <p class="row-p">默认的主题: <el-button link type="primary">跟随系统</el-button> </p>
  <p class="row-p">当前的主题: <el-button link type="primary">{{ getSelectLabel }}</el-button> </p>

  <el-select v-model="selectVal" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="(item, index) in selectList"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-button text type="primary" class="ml-10" @click="initSetSelectVal">重置</el-button>

  <div class="theme-container" data-theme="" ref="parentRef">
    切换下拉框实现主题色的切换
  </div>
</div>
</template>

<style scoped>
.theme-container[data-theme='light'] {
  --color: #333;
  --bg: #eee;
}
.theme-container[data-theme='dark'] {
  --color: #fff;
  --bg: #181818;
}

.row-p {
  display: flex;
  align-items: center;
}

.ml-10 {
  margin-left: 10px;
}

.theme-container {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 4px;
  margin-top: 20px;
  border: 1px solid #eee;
  color: var(--color);
  background: var(--bg);
}
</style>
