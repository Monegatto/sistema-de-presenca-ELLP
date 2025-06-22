<template>
  <div class="main-content">
    <h2 class="page-title">Editar Oficina</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="updateWorkshop">
        <div class="form-fields">
          <input v-model="name" type="text" placeholder="Nome da Oficina" required />

          <select v-model="teacher" required>
            <option value="" disabled>Responsável</option>
            <option v-for="teacher in teachers" :key="teacher" :value="teacher">{{ teacher }}</option>
          </select>

          <div v-for="(weekday, idx) in weekdays" :key="idx" class="weekday-select-group">
            <select v-model="weekdays[idx]" required>
              <option value="" disabled>Frequência</option>
              <option v-for="option in optionsWeekdays" :key="option" :value="option">{{ option }}</option>
            </select>
            <button type="button" @click="removeWeekday(idx)" v-if="weekdays.length > 1">-</button>
            <button type="button" @click="addWeekday" v-if="idx === weekdays.length - 1">+</button>
          </div>

          <input v-model="startTime" type="text" placeholder="Horário" required />
        </div>

        <div class="form-actions">
          <button class="save" type="submit">Salvar Alterações</button>
          <button class="delete" type="button" @click="removeWorkshop">Apagar</button>
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
  name: 'WorkshopsEdit',
  data() {
    return {
      name: '',
      weekdays: [''],
      teacher: '',
      startTime: '',
      teachers: ['Responsável 1', 'Responsável 2', 'Responsável 3'],
      optionsWeekdays: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      await this.listWorkshops(id);
    }
  },
  methods: {
    async listWorkshops(id) {
      try {
        const res = await api.get(`/workshops/${id}`);
        const workshop = res.data;
        this.name = workshop.name || '';
        this.weekdays = workshop.weekdays ? workshop.weekdays.split(',') : [''];
        this.teacher = workshop.teacher || '';
        this.startTime = workshop.startTime || '';
      } catch (error) {
        alert('Erro ao carregar oficina!');
      }
    },
    addWeekday() {
      this.weekdays.push('');
    },
    removeWeekday(idx) {
      this.weekdays.splice(idx, 1);
    },
    async updateWorkshop() {

      const confirm = await open(`editar a oficina "${this.name}"`);
      if (!confirm) return;
      
      const id = this.$route.params.id;
      try {
        await api.put(`/workshops/${id}`, {
          name: this.name,
          weekdays: this.weekdays.join(','),
          teacher: this.teacher,
          startTime: this.startTime
        });
        this.$router.push({ name: 'workshops' });
      } catch (error) {
        alert('Erro ao salvar alterações!');
      }
    },
    async removeWorkshop() {

      const confirm = await open(`remover a oficina "${this.name}"`);
      if (!confirm) return;

      const id = this.$route.params.id;
      try {
        await api.delete(`/workshops/${id}`);
        this.$router.push({ name: 'workshops' });
      } catch (error) {
        alert('Erro ao remover oficina!');
      }
    }
  }
};
</script>

<style scoped src="../assets/workshopsE.css"></style>