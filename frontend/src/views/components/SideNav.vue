<template>
  <nav class="sidenav">
    <div class="sidenav-content">
      <div class="sidenav-section">
        <span class="sidenav-section-title">PRESENÇA</span>
        <router-link to="/attendance-listing" class="sidenav-btn" :class="{ active: activeIndex === 0 }" @click="setActive(0)">
          <font-awesome-icon icon="clipboard-list" class="icon" />
          Lista de Presença
        </router-link>
      </div>
      <div class="sidenav-section">
        <span class="sidenav-section-title">CADASTRO</span>
        <router-link to="/workshops" class="sidenav-btn" :class="{ active: activeIndex === 1 }" @click="setActive(1)">
          <font-awesome-icon icon="chalkboard-teacher" class="icon" />
          Oficinas
        </router-link>
        <router-link to="/students" class="sidenav-btn" :class="{ active: activeIndex === 2 }" @click="setActive(2)">
          <font-awesome-icon icon="clipboard-list" class="icon" />
          Alunos
        </router-link>
        <router-link to="/users" class="sidenav-btn" :class="{ active: activeIndex === 3 }" @click="setActive(3)">
          <font-awesome-icon icon="clipboard-list" class="icon" />
          Usuários
        </router-link>
      </div>
      <div class="sidenav-section">
        <span class="sidenav-section-title">RELATORIO</span>
        <router-link to="/report" class="sidenav-btn" :class="{ active: activeIndex === 4 }" @click="setActive(4)">
          <font-awesome-icon icon="graduation-cap" class="icon" />
          Relatorio
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      activeIndex: null
    };
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    }
  }
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
  text-decoration: none;
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
