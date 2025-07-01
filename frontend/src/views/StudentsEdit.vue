<template>
  <div class="main-content">
    <h2 class="page-title">Editar Aluno</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="updateStudent">
        <div class="form-fields">
          <input v-model="studentId" type="text" placeholder="ID do Aluno" disabled />
          <input v-model="name" type="text" placeholder="Nome do Aluno" required />

          <select v-model="selectedWorkshop" required>
            <option value="" disabled selected>Selecione uma oficina</option>
            <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">
              {{ workshop.name }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button class="save" type="submit">Salvar Alterações</button>
          <button class="delete" type="button" @click="removeStudent">Apagar</button>
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
  name: 'StudentsEdit',
  data() {
    return {
      studentId: '',
      name: '',
      selectedWorkshop: '',
      workshops: []
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.listWorkshops();
    if (id) {
      await this.getStudentById(id);
    }
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
    async getStudentById(id) {
      try {
        const res = await api.get(`/students/${id}`);
        const student = res.data;
        this.studentId = student.id;
        this.name = student.name;
        this.selectedWorkshop = student.workshopId || '';
      } catch (err) {
        alert('Erro ao carregar dados do alunos!');
      }
    },
    async updateStudent() {

      const confirm = await open(`editar o aluno "${this.name}"`);
      if (!confirm) return;

      const id = this.$route.params.id;
      try {
        await api.put(`/students/${id}`, {
          name: this.name,
          workshop_id: this.selectedWorkshop
        });
        this.$router.push({ name: 'students' });
      } catch (err) {
        alert('Erro ao salvar alterações!');
      }
    },
    async removeStudent() {

      const confirm = await open(`remover o aluno "${this.name}"`);
      if (!confirm) return;

      const id = this.$route.params.id;
      try {
        await api.delete(`/students/${id}`);
        this.$router.push({ name: 'students' });
      } catch (err) {
        alert('Erro ao remover students');
        console.error('Erro ao remover aluno:', err);
      }
    }
  }
};
</script>

<style scoped src="../assets/studentsE.css"></style>
