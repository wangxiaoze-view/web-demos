<script setup >
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routerStore } from '../../store/module/router'



const { get_routes } = routerStore()

const route = useRoute()
const router = useRouter()
const tabName = ref('Css')

const getAllRoutes = computed(() => get_routes)


const tabClick = (name) => {
  tabName.value = name
  const findRoute = getAllRoutes.value.find(route => route.name === name)
  if (findRoute) {
    let first = findRoute.children ? findRoute.children[0].path : ''
    router.push({ path: findRoute.path + (first ? '/' + first : '') })
  }
}


const findRoutes = () => {
  const getRoute = (routes) => {
    let find = (routes.children || []).find(i => i.name === route.name)
    return find ? routes : null
  }
  const getRouteParent = getAllRoutes.value.find(item => {
    return item.children && getRoute(item) || null
  })

  // path == '/'
  !getRouteParent && tabClick('Css')

  // 其他情况
  getRouteParent && getRouteParent.name && (tabName.value = getRouteParent.name)
}

// 初始化
findRoutes()

const handlerTabs = () => {
  let tabs = []
  getAllRoutes.value.forEach(route => {
    tabs.push({
      name: route.name,
      label: route.name
    })
  })
  return tabs
}
</script>


<template>
  <el-header class="header-container">
    <div class="doc-title">Demos</div>
    <div class="doc-tabs">
      <el-tabs v-model="tabName" class="demo-tabs" @tab-change="tabClick">
        <el-tab-pane v-for="(item, index) in handlerTabs()" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="doc-tools">
      <a href="https://github.com/wangxiaoze-view/web-demos" target="_blank">
        <img class="doc-tools--icon" src="../../assets/githubb.png" alt="">
      </a>
    </div>
    <div></div>
  </el-header>
</template>

<style scoped>
.header-container {
  display: flex;
  gap: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 0 10px #eee;
  background-color: #fff;
  padding: 0;
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

.doc-tools {
  display: flex;
  align-items: center;
}

.doc-tools--icon {
  width: 24px;
  height: 24px;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}

:deep(.el-tabs__item) {
  height: 60px;
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: #fff;
}
</style>
