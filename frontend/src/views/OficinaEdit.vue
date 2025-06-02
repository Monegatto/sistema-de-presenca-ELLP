<template>
  <div class="main-content">
    <h2 class="page-title">Editar Oficina</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="editarOficina">
        <div class="form-fields">
          <input v-model="nome" type="text" placeholder="Nome da Oficina" required />

          <select v-model="coordenador" required>
            <option value="" disabled>Responsável</option>
            <option v-for="resp in responsaveis" :key="resp" :value="resp">{{ resp }}</option>
          </select>

          <div v-for="(dia, idx) in dias" :key="idx" class="dia-select-group">
            <select v-model="dias[idx]" required>
              <option value="" disabled>Frequência</option>
              <option v-for="opcao in opcoesDias" :key="opcao" :value="opcao">{{ opcao }}</option>
            </select>
            <button type="button" @click="removerDia(idx)" v-if="dias.length > 1">-</button>
            <button type="button" @click="adicionarDia" v-if="idx === dias.length - 1">+</button>
          </div>

          <input v-model="horario" type="text" placeholder="Horário" required />
        </div>

        <div class="form-actions">
          <button class="new" type="submit">Salvar Alterações</button>
          <button class="delete" type="button" @click="removerOficina">Apagar</button>
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
  async mounted() {
    const id = this.$route.params.id;
    if (id) {
      await this.carregarOficina(id);
    }
  },
  methods: {
    async carregarOficina(id) {
      try {
        const res = await axios.get(`http://localhost:3333/oficinas/${id}`);
        const oficina = res.data;
        this.nome = oficina.nome || '';
        this.dias = oficina.dias ? oficina.dias.split(',') : [''];
        this.coordenador = oficina.coordenador || '';
        this.horario = oficina.horario || '';
      } catch (error) {
        alert('Erro ao carregar oficina!');
      }
    },
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
    async removerOficina() {
      const id = this.$route.params.id;
      const confirmar = confirm('Deseja realmente remover esta oficina?'); //Temporario até a adição do modal
      if (!confirmar) return;

      try {
        await axios.delete(`http://localhost:3333/oficinas/${id}`);
        this.$router.push({ name: 'oficinas' });
      } catch (error) {
        alert('Erro ao remover oficina!');
      }
    }
  }
};
</script>

<style scoped src="../assets/oficinaE.css"></style>

<style scoped>
.delete {
  background-color: #e74c3c;
  color: white;
  margin-left: 10px;
}
</style>
