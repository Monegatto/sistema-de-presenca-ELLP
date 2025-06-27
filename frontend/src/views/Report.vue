<template>
  <div class="main-content">
    <h2 class="page-title">Relatório Oficina</h2>
    <div class="search-container">
      <form class="filter-form" @submit.prevent="getAttendanceReport">
        <div class="form-group">
          <label for="workshop">Oficina</label>
          <select id="workshop" v-model="selectedWorkshop">
            <option disabled value="">Selecione uma oficina</option>
            <option
              v-for="workshop in workshops"
              :key="workshop.id"
              :value="workshop.id"
            >
              {{ workshop.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn-filtrar" :disabled="loading">
          {{ loading ? 'Carregando...' : 'Relatório' }}
        </button>
      </form>
    </div>

    <div v-if="students.length" class="content-box">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Estudante</th>
            <th>ID do Estudante</th>
            <th>Presença (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.id }}</td>
            <td>{{ student.percentage.toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="!loading && searched">
      <p>Nenhum resultado encontrado.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const workshops = ref([]);
    const selectedWorkshop = ref('');
    const students = ref([]);
    const loading = ref(false);
    const searched = ref(false);

    const toast = useToast();

    const listWorkshops = async () => {
      try {
        const response = await api.get('/workshops');
        workshops.value = response.data;
      } catch (error) {
        toast.error('Erro ao buscar oficinas.');
        console.error(error);
      }
    };

    const getAttendanceReport = async () => {
      if (!selectedWorkshop.value) {
        toast.warning('Por favor, selecione uma oficina.');
        return;
      }

      loading.value = true;
      searched.value = false;
      students.value = [];

      try {
        const response = await api.get(`/workshops/${selectedWorkshop.value}/students`, {
          params: { workshop: selectedWorkshop.value }
        });

        const alunos = response.data;

        const promises = alunos.map(async aluno => {
          try {
            const res = await api.get(`/workshops/${selectedWorkshop.value}/students/${aluno.id}/attendance-percentage`);
            return {
              id: aluno.id,
              name: aluno.name,
              percentage: res.data.percentage ?? 0
            };
          } catch (err) {
            console.error(`Erro ao buscar % de presença para ${aluno.name}`, err);
            return {
              id: aluno.id,
              name: aluno.name,
              percentage: 0
            };
          }
        });

        students.value = await Promise.all(promises);

        if (students.value.length === 0) {
          toast.info('Nenhum resultado encontrado.');
        }

        searched.value = true;
      } catch (error) {
        toast.error('Erro ao buscar relatório.');
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      listWorkshops();
    });

    return {
      workshops,
      selectedWorkshop,
      students,
      getAttendanceReport,
      loading,
      searched
    };
  }
};
</script>

<style scoped src="../assets/presenca.css"></style>
