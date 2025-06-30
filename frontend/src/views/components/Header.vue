<template>
  <header class="header">
    <span class="header-title">ELLP</span>
    <div class="header-actions">
      <button class="logout-btn" @click="logout">
        <font-awesome-icon icon="right-from-bracket" />
        <span>Sair</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useConfirmationModal } from '@/plugins/ModalPlugin';

const { open } = useConfirmationModal();
const router = useRouter()

async function logout() {

    const confirm = await open(`realmente sair`);
    if (!confirm) return;

    localStorage.removeItem('token')
    localStorage.removeItem('token_expiration')
    router.push('/')
}
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #fff;
  padding: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 16px rgb(60, 60, 60, 0.10);
  z-index: 1000;
}

.header-title {
  margin-left: 24px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #222;
  letter-spacing: 1px;
}

.header-actions {
  margin-right: 24px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1.05rem;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
}

.logout-btn:hover {
  background-color: #ffe5e5;
  color: #c70000;
}

.logout-btn span {
  font-weight: 500;
}
</style>
