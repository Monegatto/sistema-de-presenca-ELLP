<script setup>
  import Header from './views/components/Header.vue';
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
