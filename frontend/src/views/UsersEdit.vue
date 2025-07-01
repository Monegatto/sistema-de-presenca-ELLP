<template>
  <div class="main-content">
    <h2 class="page-title">Editar Usuário</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="updateUser">
        <div class="form-fields">
          <input v-model="userId" type="text" placeholder="ID do Usuário" disabled />
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
          <div style="margin-top: 10px;">
            <label>
              Esqueceu a senha?
              <select v-model="forgotPassword">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </label>
          </div>
        </div>
        <div class="form-actions">
          <button class="save" type="submit">Salvar Alterações</button>
          <button class="delete" type="button" @click="removeUser">Apagar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import { useConfirmationModal } from '@/plugins/ModalPlugin';

const { open } = useConfirmationModal();

export default {
  name: 'UsersEdit',
  data() {
    return {
      userId: '',
      name: '',
      username: '',
      password: '',
      showPassword: false,
      forgotPassword: false
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      await this.getUserById(id);
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async getUserById(id) {
      try {
        const res = await api.get(`/teachers/${id}`);
        const user = res.data;
        this.userId = user.id;
        this.name = user.name;
        this.username = user.username;
        this.password = user.password;
        this.forgotPassword = user.forgotPassword;
      } catch (err) {
        alert('Erro ao carregar dados do usuário!');
      }
    },
    async updateUser() {
      const confirm = await open(`editar o usuário "${this.name}"`);
      if (!confirm) return;
      const id = this.$route.params.id;
      try {
        await api.put(`/teachers/${id}`, {
          name: this.name,
          username: this.username,
          password: this.password,
          forgotPassword: this.forgotPassword
        });
        this.$router.push({ name: 'users' });
      } catch (err) {
        console.error('Erro ao salvar alterações:', err);
        alert('Erro ao salvar alterações!');
      }
    },
    async removeUser() {
      const confirm = await open(`remover o usuário "${this.name}"`);
      if (!confirm) return;
      const id = this.$route.params.id;
      try {
        await api.delete(`/teachers/${id}`);
        this.$router.push({ name: 'users' });
      } catch (err) {
        alert('Erro ao remover usuário!');
      }
    }
  }
};
</script>

<style scoped src="../assets/usersE.css"></style>
