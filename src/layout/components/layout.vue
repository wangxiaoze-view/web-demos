<script setup lang="ts">
import MenuVue from './menu.vue';
import headerVue from './header.vue';
</script>
<template>
  <div class="layout">
    <headerVue />
    <div class="layout-container">
      <MenuVue />
      <div class="layout-content">
      </div>
    </div>
  </div>
</template>



<style scoped>
@import url('../styles/layout.css');
</style>
