<template>
  <div class="main-content">
    <h2 class="page-title">Lista de Presença</h2>
    <div class="content-box">
      <form class="filter-form" @submit.prevent="TODO">
        <div class="form-group">
          <label for="workshop">Oficina</label>
          <select id="workshop" v-model="workshop">
            <option disabled value="">Selecione uma oficina</option>
            <option v-for="workshopItem in workshops" :key="workshopItem.id" :value="workshopItem.name">
              {{ workshopItem.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Data</label>
          <input id="date" type="date" v-model="date" />
        </div>
        <button type="submit" class="btn-filtrar" :disabled="loading">
          {{loading ? 'loading...' : 'Listar'}}
        </button>
      </form>
    </div>

    <div v-if="students.length" class="tabela-box">
      <h3 class="titulo">Lista de Presença</h3>
      <table class="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Estudante</th>
            <th>ID do Estudante</th>
            <th>Presença</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.name }}</td>
            <td>
              <select v-model="student.presenca">
                <option disabled value="">Selecione</option>
                <option :value="true">Presente</option>
                <option :value="false">Ausente</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn-enviar" @click="TODO2">Enviar</button>
    </div>

    <div v-else-if="!loading && searched">
      <p>Nenhum resultado encontrado.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import api from '../services/api';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const workshops = ref([]);
    const workshop = ref('');
    const date = ref('');
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
      }
    };

    // Funcionalidades relacionadas a presença dos alunos serão desenvolvidas na próxima sprint
    async function TODO() {
      if (!date.value) {
        toast.warning('Por favor, selecione uma data.');
        return;
      }

      loading.value = true;
      searched.value = false;

      try {
        const response = await api.get('/workshops/TODO', {
          params: {
            workshop: workshop.id,
            date: date.value,
          },
        });

        students.value = response.data.map(p => ({
          ...p
        }));

        if (students.value.length === 0) {
          toast.info('Nenhum resultado encontrado.');
        }

        searched.value = true;
      } catch (error) {
        toast.error('Erro ao buscar alunos. Tente novamente.');
        console.error(error);
      } finally {
        loading.value = false;
      }
    }

    async function TODO2() {
      const invalidos = students.value.filter(p => p.presenca === '');
      if (invalidos.length > 0) {
        toast.warning('Marque a presença de todos os alunos antes de enviar.');
        return;
      }

      try {
        await api.post('/students/todo', {
          date: date.value,
          workshop: workshop.value,
          presenca: students.value.map(a => ({
            student_id: a.id,
            presenca: a.presenca,
          })),
        });
        toast.success('Presenças enviadas com sucesso!');
      } catch (error) {
        toast.error('Erro ao enviar presenças.');
        console.error(error);
      }
    }

    onMounted(() => {
      listWorkshops();
    });
    return {
      workshop,
      workshops,
      date,
      students,
      loading,
      searched,
      TODO,
      TODO2,
    };
  },
};
</script>

<style scoped src="../assets/presenca.css"></style>
