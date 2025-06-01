<template>
  <div class="main-content">
    <h2 class="page-title">Relatório Oficina</h2>
    
    <div class="content-box">
      <form class="filter-form" @submit.prevent="buscarRelatorio">
        <div class="form-group">
          <label for="oficina">Oficina</label>
          <select id="oficina" v-model="oficinaSelecionada" required placeholder="Selecione uma oficina">
            <option disabled value="">Selecione uma oficina</option>
            <option v-for="oficina in oficinas" :key="oficina.id" :value="oficina.nome">
              {{ oficina.nome }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn-filtrar" :disabled="carregando">
          {{ carregando ? 'Carregando...' : 'Relatório' }}
        </button>
      </form>
    </div>

    <div v-if="relatorio.length" class="tabela-relatorio">
      <div class="header">
        <h3>Alunos</h3>
        <input
          type="text"
          placeholder="Busca por Nome"
          v-model="filtro"
          class="search-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Estudante</th>
            <th>Presença</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(aluno, index) in alunosFiltrados"
            :key="aluno.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.presenca }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="!carregando && buscou">
      <p>Nenhum resultado encontrado.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const oficinas = ref([])
    const oficinaSelecionada = ref('')
    const relatorio = ref([])
    const filtro = ref('')
    const carregando = ref(false)
    const buscou = ref(false)

    const toast = useToast()

    const alunosFiltrados = computed(() => {
      return relatorio.value.filter(aluno =>
        aluno.nome.toLowerCase().includes(filtro.value.toLowerCase())
      )
    })

    const buscarOficinas = async () => {
      try {
        const response = await axios.get('http://localhost:3333/oficinas')
        oficinas.value = response.data
      } catch (error) {
        toast.error('Erro ao buscar oficinas.')
        console.error(error)
      }
    }
    //Funcionalidades relacionadas a presença serão desenvolvidas na próxima sprint
    const buscarRelatorio = async () => {
      if (!oficinaSelecionada.value) return

      carregando.value = true
      buscou.value = false

      try {
        const response = await axios.get('http://localhost:3333/alunos/todo', {
          params: { oficina: oficinaSelecionada.value }
        })

        relatorio.value = response.data
        buscou.value = true
      } catch (error) {
        toast.error('Erro ao buscar relatório.')
        console.error(error)
      } finally {
        carregando.value = false
      }
    }

    onMounted(() => {
      buscarOficinas()
    })

    return {
      oficinas,
      oficinaSelecionada,
      relatorio,
      filtro,
      alunosFiltrados,
      buscarRelatorio,
      carregando,
      buscou,
    }
  }
}
</script>

<style scoped src="../assets/presenca.css"></style>
