<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routerStore } from '../../store/module/router'
// const route = useRoute()

const { get_routes } = routerStore()

const router = useRouter()
const tabName = ref('Css')

const getAllRoutes = computed(() => get_routes)

const tabClick = () => {

  const findRoute = getAllRoutes.value.find(route => route.name === tabName.value)
  if (findRoute) {
    router.push({ name: findRoute.name })
  }
}


const handlerTabs = [
  { name: 'Css', label: 'Css' },
  { name: 'Html', label: 'Html' },
  { name: 'JavaScript', label: 'JavaScript' },
  { name: 'Vue', label: 'Vue' },
]
</script>


<template>
  <el-header class="header-container">

    <div class="doc-title">Demos</div>

    <div class="doc-tabs">
      <el-tabs v-model="tabName" class="demo-tabs" @tab-click="tabClick">
        <el-tab-pane v-for="(item, index) in handlerTabs" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
    </div>
  </el-header>
</template>

<style scoped>
.header-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 0 0px 10px #eee;
  background-color: #fff;
}

.doc-title {
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.doc-tabs {
  flex: 1;
}
</style>