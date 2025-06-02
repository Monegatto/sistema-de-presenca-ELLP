<template>
  <div class="main-content">
    <h2 class="page-title">Cadastrar Oficina</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="cadastrarOficina">
        <div class="form-fields">
          <input v-model="nome" type="text" placeholder="Nome da Oficina" required />

          <select v-model="coordenador" required>
            <option value="" disabled selected>Responsável</option>
            <option v-for="resp in responsaveis" :key="resp" :value="resp">{{ resp }}</option>
          </select>

          <div v-for="(dia, idx) in dias" :key="idx" class="dia-select-group">
            <select v-model="dias[idx]" required>
              <option value="" disabled selected>Frequência</option>
              <option v-for="opcao in opcoesDias" :key="opcao" :value="opcao">{{ opcao }}</option>
            </select>
            <button type="button" @click="removerDia(idx)" v-if="dias.length > 1">-</button>
            <button type="button" @click="adicionarDia" v-if="idx === dias.length - 1">+</button>
          </div>

          <input v-model="horario" type="text" placeholder="Horário" required />
        </div>

        <div class="form-actions">
          <button class="new" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OficinasNew',
  data() {
    return {
      nome: '',
      dias: [''],
      coordenador: '',
      horario: '',
      responsaveis: ['Responsável 1', 'Responsável 2', 'Responsável 3'],
      opcoesDias: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']
    };
  },
  methods: {
    adicionarDia() {
      this.dias.push('');
    },
    removerDia(idx) {
      this.dias.splice(idx, 1);
    },
    async cadastrarOficina() {
      try {
        await axios.post('http://localhost:3333/oficinas', {
          nome: this.nome,
          dias: this.dias.join(','),
          coordenador: this.coordenador,
          horario: this.horario
        });
        this.$router.push({ name: 'oficinas' });
      } catch (error) {
        alert('Erro ao cadastrar oficina!');
      }
    }
  }
};
</script>

<style scoped src="../assets/oficinaN.css"></style>
