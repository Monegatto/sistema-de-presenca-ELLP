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
            <button type="button" @click="handleForgotPassword">Esqueceu a senha?</button>
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
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const expiration = decoded.exp * 1000;
    console.log('Token expira em:', new Date(expiration).toLocaleString());

    localStorage.setItem('token', token);
    localStorage.setItem('token_expiration', expiration.toString());

    router.push('/attendance-listing');
    const hideLayout = ref(false);

  } catch (error) {
    toast.warning('Usuário ou senha inválidos');
  }
}

async function handleForgotPassword() {
  if (!username.value) {
    toast.warning('Digite o usuário para recuperar a senha.');
    return;
  }
  try {
    const res = await api.get(`/teachers/username/${username.value}`);
    const teacher = res.data;
    if (teacher.forgotPassword) {
      toast.info('A solicitação de recuperação já foi feita.');
      return;
    }
    await api.put(`/teachers/forgot-password/${username.value}`);
    toast.success('Solicitação de recuperação enviada!');
  } catch (error) {
    toast.error('Usuário não encontrado ou erro ao solicitar recuperação.');
  }
}
</script>

<style scoped src="../assets/login.css"></style>
