<script setup>
import { computed } from 'vue';
import Header from './views/components/Header.vue';
import SideNav from './views/components/SideNav.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const hideLayout = computed(() => route.path === '/');
</script>

<template>
  <div class="app-container">
    <Header v-show="!hideLayout" />
    <div class="app-content">
      <SideNav v-show="!hideLayout" />
      <main class="main-view">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  min-height: 0;
  overflow: hidden;
}

.main-view {
  flex: 1;
  min-width: 0;
  background: #f3f4f6;
  overflow: auto;
}
</style>
