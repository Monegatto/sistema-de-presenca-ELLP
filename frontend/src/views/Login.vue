<template>
  <header class="header">
        <span class="header-title">ELLP</span>
    </header>
  <div class="container">
    <div class="info-section">
        <h1>Sistema de Presença</h1>
        <p>Controle de Presença EELP - Ensino Lúdico De Lógica de Programação</p>
    </div>
    <div class="login-box">
      <div class="form-section">
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Usuário</label>
            <input v-model="username" id="username" type="text" placeholder="Digite seu usuário" required />
          </div>
          <div class="input-group">
            <label for="password">Senha</label>
            <input v-model="password" id="password" type="password" placeholder="Digite sua senha" required />
          </div>
          <div class="actions">
            <button type="submit">Logar</button>
            <a href="#">Esqueceu a senha?</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../services/api';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const toast = useToast();

async function handleLogin() {
  try{
    const response = await api.post('/login', {
      username: username.value,
      password: password.value
    });

    const token = response.data.token
    localStorage.setItem('token', token)

    router.push('/lista-presenca');
    const hideLayout = ref(false);

  } catch (error) {
    toast.warning('Usuário ou senha inválidos');
  }
}
</script>

<style scoped src="../assets/login.css"></style>
