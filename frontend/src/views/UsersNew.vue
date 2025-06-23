<template>
  <div class="main-content">
    <h2 class="page-title">Cadastrar Usuário</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="createUser">
        <div class="form-fields">
          <input v-model="name" type="text" placeholder="Nome do Usuário" required />
          <input v-model="username" type="text" placeholder="Username" required />
          <div style="position: relative; display: flex; align-items: center;">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Senha" required class="password-input" style="padding-right: 32px;" />
            <font-awesome-icon
              :icon="showPassword ? 'eye-slash' : 'eye'"
              class="password-eye-icon"
              @click="togglePasswordVisibility"
              style="position: absolute; right: 10px; cursor: pointer; color: #888; font-size: 18px;"
            />
          </div>
        </div>

        <div class="form-actions">
          <button class="new" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'UsersNew',
    data() {
    return {
        name: '',
        username: '',
        password: '',
        showPassword: false,
        workshops: []
    };
    },
    mounted() {
      this.listWorkshops();
    },
    methods: {
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    },
    async listWorkshops() {
      try {
        const res = await api.get('/workshops');
        this.workshops = res.data;
      } catch (err) {
        console.error('Erro ao carregar oficinas:', err);
      }
    },
    async createUser() {
        try {
        await api.post('/teachers', {
            name: this.name,
            username: this.username,
            password: this.password,
        });
        this.$router.push({ name: 'users' });
        } catch (error) {
            alert(`Erro ao cadastrar usuário: ${error.response?.data?.message || error.message}`);
        }
    }
    }
};
</script>

<style scoped src="../assets/usersN.css"></style>
