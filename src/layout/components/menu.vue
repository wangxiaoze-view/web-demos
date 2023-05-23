<script setup lang="ts">
import { watch, ref, computed } from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'
import { routerStore } from '../../store/module/router'

type routeType = {
  [k: string]: any
}
type CustonRouteType = RouteRecordRaw | routeType



const route: any = useRoute()
const router = useRouter()
const routesRef = ref<CustonRouteType[]>([])

const { get_routes } = routerStore()
const getAllRoutes = computed(() => get_routes)

const setRoutes = ({ fullPath }: { fullPath: string }) => {
  let fullPathArr = fullPath.split('/').filter(item => item != '')
  const getRoute = getAllRoutes.value.find((r: CustonRouteType) => {
    const name = r.name.toLocaleLowerCase()
    return fullPathArr.includes(name)
  })


  routesRef.value = (getRoute ? getRoute.children : []) as CustonRouteType[]
}

const toRouterPage = (route: CustonRouteType) => {
  router.push({ name: route.name })
}

setRoutes(route)

watch(() => route.fullPath, () => {
  setRoutes(route)
})

</script>
<template>
  <el-aside width="200px" class="aside-view">
    <el-scrollbar class="aside-view--scroller">
      <el-menu class="menu-vue--contaienr" default-active="2" background-color="#fff">
        <el-menu-item index="2" v-for="(route) in routesRef" :key="route.path" @click="toRouterPage(route)">
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

.menu-vue--contaienr {
  border-right: none;
}
</style>
