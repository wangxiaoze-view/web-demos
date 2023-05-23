<script setup lang="ts">
import MenuVue from './menu.vue';
import headerVue from './header.vue';
import viewVue from './view.vue';
</script>
<template>
  <div class="layout">
    <headerVue />
    <div class="layout-container">
      <MenuVue />

      <div class="layout-content ">
        <viewVue />
      </div>
    </div>
  </div>
</template>



<style scoped>
@import url('../styles/layout.css');

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s color 0.1s, font-size 0s;
}

.fade-transform-enter,
.fade-transform-leave-top {
  opacity: 0;
}
</style>
