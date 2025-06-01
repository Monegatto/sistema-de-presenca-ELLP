<template>
  <div class="main-content">
    <h2 class="page-title">Lista de Presença</h2>
    <div class="content-box">
      <form class="filter-form" @submit.prevent="buscaralunos">
        <div class="form-group">
          <label for="oficina">Oficina</label>
          <select id="oficina" v-model="oficina">
            <option disabled value="">Selecione uma oficina</option>
            <option v-for="oficinaItem in oficinas" :key="oficinaItem.id" :value="oficinaItem.nome">
              {{ oficinaItem.nome }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="data">Data</label>
          <input id="data" type="date" v-model="data" />
        </div>
        <button type="submit" class="btn-filtrar" :disabled="carregando">
          {{carregando ? 'Carregando...' : 'Listar'}}
        </button>
      </form>
    </div>

    <div v-if="alunos.length" class="tabela-box">
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
          <tr v-for="(aluno, index) in alunos" :key="aluno.id">
            <td>{{ index + 1 }}</td>
            <td>{{ aluno.nome }}</td>
            <td>
              <select v-model="aluno.presenca">
                <option disabled value="">Selecione</option>
                <option :value="true">Presente</option>
                <option :value="false">Ausente</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn-enviar" @click="enviarPresencas">Enviar</button>
    </div>

    <div v-else-if="!carregando && buscou">
      <p>Nenhum resultado encontrado.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted} from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const oficinas = ref([]);
    const oficina = ref('');
    const data = ref('');
    const alunos = ref([]);
    const carregando = ref(false);
    const buscou = ref(false);

    const toast = useToast();

    const buscarOficinas = async () => {
      try {
        const response = await axios.get('http://localhost:3333/oficinas');
        oficinas.value = response.data;
      } catch (error) {
        toast.error('Erro ao buscar oficinas.');
      }
    };

    // Funcionalidades relacionadas a presença dos alunos serão desenvolvidas na próxima sprint
    async function buscaralunos() {
      if (!data.value) {
        toast.warning('Por favor, selecione uma data.');
        return;
      }

      carregando.value = true;
      buscou.value = false;

      try {
        const response = await axios.get('http://localhost:3333/oficinas/todo', {
          params: {
            oficina: oficina.id,
            data: data.value,
          },
        });

        alunos.value = response.data.map(p => ({
          ...p
        }));

        if (alunos.value.length === 0) {
          toast.info('Nenhum resultado encontrado.');
        }

        buscou.value = true;
      } catch (error) {
        toast.error('Erro ao buscar alunos. Tente novamente.');
        console.error(error);
      } finally {
        carregando.value = false;
      }
    }

    async function enviarPresencas() {
      const invalidos = alunos.value.filter(p => p.presenca === '');
      if (invalidos.length > 0) {
        toast.warning('Marque a presença de todos os alunos antes de enviar.');
        return;
      }

      try {
        await axios.post('http://localhost:3333/alunos/todo', {
          data: data.value,
          oficina: oficina.value,
          presenca: alunos.value.map(a => ({
            alunoId: a.id,
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
      buscarOficinas();
    });
    return {
      oficina,
      oficinas,
      data,
      alunos,
      carregando,
      buscou,
      buscaralunos,
      enviarPresencas,
    };
  },
};
</script>

<style scoped src="../assets/presenca.css"></style>
