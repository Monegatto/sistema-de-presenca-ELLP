<template>
  <div class="main-content">
    <h2 class="page-title">Cadastrar Oficina</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="createWorkshop">
        <div class="form-fields">
          <input v-model="name" type="text" placeholder="Nome da Oficina" required />

          <select v-model="teacher" required>
            <option value="" disabled selected>Responsável</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.name }}
            </option>
          </select>


          <div v-for="(weekday, idx) in weekdays" :key="idx" class="weekday-select-group">
            <select v-model="weekdays[idx]" required>
              <option value="" disabled selected>Frequência</option>
              <option v-for="option in optionsWeekdays" :key="option" :value="option">{{ option }}</option>
            </select>
            <button type="button" @click="removeWeekday(idx)" v-if="weekdays.length > 1">-</button>
            <button type="button" @click="addWeekday" v-if="idx === weekdays.length - 1">+</button>
          </div>

          <input v-model="startTime" type="time" required />

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
  name: 'workshopsNew',
  data() {
    return {
      name: '',
      weekdays: [''],
      teacher: '',
      startTime: '',
      teachers: [],
      optionsWeekdays: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']
    };
  },
  mounted() {
    this.listTeachers();
  },
  methods: {
    async listTeachers() {
      try {
        const res = await api.get('/teachers');
        this.teachers = res.data;
      } catch (error) {
        alert('Erro ao carregar professores!');
      }
    },
    addWeekday() {
      this.weekdays.push('');
    },
    removeWeekday(idx) {
      this.weekdays.splice(idx, 1);
    },
    async createWorkshop() {
      try {
        await api.post('/workshops', {
          name: this.name,
          weekdays: this.weekdays.join(','),
          teacher: this.teacher,
          startTime: this.startTime
        });
        this.$router.push({ name: 'workshops' });
      } catch (error) {
        alert(`Erro ao cadastrar oficina: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};
</script>

<style scoped src="../assets/workshopsN.css"></style>
