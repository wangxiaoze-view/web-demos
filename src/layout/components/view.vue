<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :max="15">
        <component :is="Component" ref="componentRef" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
