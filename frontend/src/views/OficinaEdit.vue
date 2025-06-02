<template>
  <div class="main-content">
    <h2 class="page-title">Modificar Oficina</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="editarOficina">
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
          <button class="save" type="submit">Salvar</button>
          <button class="cancell" type="button" @click="voltar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OficinasEdit',
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
  async created() {
    const id = this.$route.params.id;
    if (id) {
      try {
        const response = await axios.get(`http://localhost:3333/oficinas/${id}`);
        const oficina = response.data;

        this.nome = oficina.nome || '';
        this.coordenador = oficina.coordenador || '';
        this.horario = oficina.horario || '';
        this.dias = oficina.dias ? oficina.dias.split(',') : [''];
      } catch (error) {
        alert('Erro ao carregar os dados da oficina.');
      }
    }
  },
  methods: {
    adicionarDia() {
      this.dias.push('');
    },
    removerDia(idx) {
      this.dias.splice(idx, 1);
    },
    async editarOficina() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://localhost:3333/oficinas/${id}`, {
          nome: this.nome,
          dias: this.dias.join(','),
          coordenador: this.coordenador,
          horario: this.horario
        });
        this.$router.push({ name: 'oficinas' });
      } catch (error) {
        alert('Erro ao salvar alterações!');
      }
    },
    voltar() {
      this.$router.back();
    }
  }
};
</script>

<style scoped src="../assets/oficinaE.css"></style>
