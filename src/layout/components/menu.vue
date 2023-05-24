<script setup>
import { watch, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { routerStore } from '../../store/module/router'

const route = useRoute()
const router = useRouter()
const routesRef = ref()

const { get_routes } = routerStore()
const getAllRoutes = computed(() => get_routes)

const setRoutes = ({ fullPath }) => {
  let fullPathArr = fullPath.split('/').filter(item => item !== '')
  const getRoute = getAllRoutes.value.find((r) => {
    const name = r.name.toLocaleLowerCase()
    return fullPathArr.includes(name)
  })


  routesRef.value = (getRoute ? getRoute : {})
}

const toRouterPage = (route) => {
  router.push({ name: route.name })
}

const routeKey = (parentPath, childPath) => {
  return  parentPath + '/' + childPath
}

setRoutes(route)

watch(() => route.fullPath, () => {
  setRoutes(route)
})

</script>
<template>
  <el-aside width="200px" class="aside-view">
    <el-scrollbar class="aside-view--scroller">
      <el-menu class="menu-vue--container"  background-color="#fff" :default-active="route.fullPath">
        <el-menu-item
          :index="routeKey(routesRef.path, route.path)"
          v-for="(route) in routesRef.children"
          :key="routeKey(routesRef.path, route.path)"
          @click="toRouterPage(route)"
        >
          <el-icon>
            <Sunset />
          </el-icon>
          <template #title>{{ route.meta.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>

  </el-aside>
</template>



<style scoped>
.aside-view {
  width: 200px;
  height: 100vh;
  /* overflow: hidden; */
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: #fff;
  transition: width .3s;
  box-shadow: 2px 10px 20px #ddd;
}

.menu-vue--container {
  border-right: none;
}
</style>
