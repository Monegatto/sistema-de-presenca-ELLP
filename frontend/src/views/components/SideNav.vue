<template>
  <nav class="sidenav">
    <div class="sidenav-content">
      <div class="sidenav-section">
        <span class="sidenav-section-title">PRESENÇA</span>
        <button 
          class="sidenav-btn" 
          :class="{ active: $route.path === '/lista-presenca' }"
          @click="navigateTo('/lista-presenca')"
        >
          <font-awesome-icon icon="clipboard-list" class="icon" />
          Lista de Presença
        </button>
      </div>
      <div class="sidenav-section">
        <span class="sidenav-section-title">CADASTRO</span>
        <button class="sidenav-btn">
            <font-awesome-icon icon="chalkboard-teacher" class="icon" />
          Oficinas
        </button>
        <button class="sidenav-btn">
            <font-awesome-icon icon="user-graduate" class="icon" />
          Alunos
        </button>
      </div>
      <div class="sidenav-section">
        <span class="sidenav-section-title">RELATORIO</span>
        <button 
          class="sidenav-btn"
          :class="{ active: $route.path === '/relatorio-presenca' }"
          @click="navigateTo('/relatorio-presenca')"
        >
          <font-awesome-icon icon="graduation-cap" class="icon" />
          Relatorio
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'SideNav',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo,
      currentPath: route.path,
    };
  },
};
</script>

<style scoped>
.sidenav {
  top: 0;
  left: 0;
  width: 230px;
  background: #fff;
  box-shadow: 2px 0 16px 0 rgba(60, 60, 60, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidenav-content {
  padding: 36px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sidenav-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 28px;
}

.sidenav-section-title {
  font-size: 11px;
  color: #b0b7c3;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 4px;
}

.sidenav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: none;
  outline: none;
  color: #1a3472;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  padding: 10px;
  margin-right: 16px;
  box-shadow: 0 1px 6px rgba(60, 60, 60, 0.1);
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
}

.sidenav-btn:not(.active):hover {
  background: #f5f8fd;
  box-shadow: 0 2px 12px rgba(60, 60, 60, 0.09);
}

.sidenav-btn.active {
  background: #f5f8fd;
  color: #2266cc;
  box-shadow: 0 2px 12px rgba(34, 102, 204, 0.12);
}

.icon {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.sidenav-content > .sidenav-section:first-child {
  margin-top: 12px;
}
</style>