<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router'

interface RotueType {
  name: string,
  path: string,
  meta: any,
  children: RotueType[],
}

const route: any = useRoute()
const routesRef = ref<RotueType[]>([])

const setRoutes = ({ name, matched }: { name: string, matched: RotueType[] }) => {
  const getRoute = matched.find((route: RotueType) => route.name === name)
  routesRef.value = getRoute ? getRoute.children : []
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
        <el-menu-item index="2" v-for="(route) in routesRef" :key="route.path">
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
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  transition: width .3s;
  box-shadow: 2px 10px 20px #ddd;
}

.menu-vue--contaienr {
  border-right: none;
}
</style>
