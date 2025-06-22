<template>
  <div class="main-content">
    <h2 class="page-title">Cadastrar Aluno</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="createStudent">
        <div class="form-fields">
          <input v-model="name" type="text" placeholder="Nome do Aluno" required />

          <select v-model="selectedWorkshop" required>
            <option value="" disabled selected>Selecione uma oficina</option>
            <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">
                {{ workshop.name }}
            </option>
          </select>

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
  name: 'StudentsNew',
    data() {
    return {
        name: '',
        selectedWorkshop: '',
        workshops: []
    };
    },
    mounted() {
    this.listWorkshops();
    },
    methods: {
    async listWorkshops() {
        try {
        const res = await api.get('/workshops');
        this.workshops = res.data;
        } catch (err) {
        console.error('Erro ao carregar oficinas:', err);
        }
    },
    async createStudent() {
        try {
        await api.post('/students', {
            name: this.name,
            workshop_id: this.selectedWorkshop
        });
        this.$router.push({ name: 'students' });
        } catch (error) {
        alert('Erro ao cadastrar aluno!');
        }
    }
    }
};
</script>

<style scoped src="../assets/studentsN.css"></style>
