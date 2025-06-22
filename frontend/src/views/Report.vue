<template>
  <div class="main-content">
    <h2 class="page-title">Relatório Oficina</h2>
    <div class="content-box">
      <form class="filter-form" @submit.prevent="TODO">
        <div class="form-group">
          <label for="workshop">Oficina</label>
          <select id="workshop" v-model="selectedWorkshop" required placeholder="Selecione uma oficina">
            <option disabled value="">Selecione uma oficina</option>
            <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.name">
              {{ workshop.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn-filtrar" :disabled="loading">
          {{ loading ? 'loading...' : 'Relatório' }}
        </button>
      </form>
    </div>

    <div v-if="report.length" class="report-table">
      <div class="header">
        <h3>Students</h3>
        <input
          type="text"
          placeholder="Busca por Nome"
          v-model="filter"
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
            v-for="(student, index) in filteredStudents"
            :key="student.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.present }}%</td>
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
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../services/api'

export default {
  setup() {
    const workshops = ref([])
    const selectedWorkshop = ref('')
    const report = ref([])
    const filter = ref('')
    const loading = ref(false)
    const searched = ref(false)

    const toast = useToast()

    const filteredStudents = computed(() => {
      return report.value.filter(student =>
        student.name.toLowerCase().includes(filter.value.toLowerCase())
      )
    })

    const listWorkshops = async () => {
      try {
        const response = await api.get('/workshops')
        workshops.value = response.data
      } catch (error) {
        toast.error('Erro ao buscar oficinas.')
        console.error(error)
      }
    }
    //Funcionalidades relacionadas a presença serão desenvolvidas na próxima sprint
    const TODO = async () => {
      if (!selectedWorkshop.value) return

      loading.value = true
      searched.value = false

      try {
        const response = await api.get('/students/todo', {
          params: { workshop: selectedWorkshop.value }
        })

        report.value = response.data
        searched.value = true
      } catch (error) {
        toast.error('Erro ao buscar relatório.')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      listWorkshops()
    })

    return {
      workshops,
      selectedWorkshop,
      report,
      filter,
      filteredStudents,
      TODO,
      loading,
      searched,
    }
  }
}
</script>

<style scoped src="../assets/presenca.css"></style>
