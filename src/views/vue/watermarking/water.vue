<script setup lang="ts">
import {defineProps, onMounted, onUnmounted, ref, watchEffect} from 'vue'
import useWater from './water'
import {WaterProps} from "./inter";


// props
const props = defineProps({
  text: String,
  fontSize: {
    type: Number,
    default: 30,
  },
  gap: {
    type: Number,
    default: 100
  }
})

// parent ref
const parentRef = ref()

// uid
const uId = ref(0)

// bg
const bg = useWater(props)
const {base, styleSize} = bg.value;

let div
watchEffect(() => {
  // 搜集依赖
  uId.value;
  if (!parentRef.value) return
  div && (div.remove())
  div = document.createElement('div')
  div.style.backgroundImage = `url(${base})`
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`
  div.style.backgroundRepeat = 'repeat'
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.position = 'absolute'
  div.style.inset = '0';
  parentRef.value.appendChild(div)
})

let ob;
onMounted(() => {
  ob = new MutationObserver((records) => {
    for (const record of records) {
      // 监听删除
      for (const dom of record.removedNodes) {
        if (dom == div) {
          return uId.value++
        }
      }

      // 监听修改属性
      if (record.target == div) {
        return uId.value++
      }
    }
  })

  ob.observe(parentRef.value, {
    childList: true, // 节点的新增与删除
    attributes: true, // 节点属性值
    subtree: true // 整个子树
  });
})

onUnmounted(() => {
  ob.disconnect();
  // 清空，避免内存泄露
  div = null;
})


</script>

<template>
  <div class="water-container" ref="parentRef">
    <slot></slot>
  </div>
</template>

<style scoped>
.water-container {
  position: relative;
}
</style>
