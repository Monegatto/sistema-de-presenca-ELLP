<template>
  <div class="main-content">
    <h2 class="page-title">Modificar Aluno</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="editarAluno">
        <div class="form-fields">
          <input v-model="nome" type="text" placeholder="Nome do Aluno" required />

          <select v-model="oficinaSelecionada" required>
            <option value="" disabled selected>Selecione uma oficina</option>
            <option v-for="oficina in oficinas" :key="oficina.id" :value="oficina.id">
              {{ oficina.nome }}
            </option>
          </select>
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
  name: 'AlunosEdit',
  data() {
    return {
      nome: '',
      oficinaSelecionada: '',
      oficinas: []
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    await this.carregarOficinas();
    if (id) {
      await this.carregarAluno(id);
    }
  },
  methods: {
    async carregarOficinas() {
      try {
        const res = await axios.get('http://localhost:3333/oficinas');
        this.oficinas = res.data;
      } catch (err) {
        console.error('Erro ao carregar oficinas:', err);
      }
    },
    async carregarAluno(id) {
      try {
        const res = await axios.get(`http://localhost:3333/alunos/${id}`);
        const aluno = res.data;
        this.nome = aluno.nome;
        this.oficinaSelecionada = aluno.oficina_id || '';
      } catch (err) {
        alert('Erro ao carregar dados do aluno!');
      }
    },
    async editarAluno() {
      const id = this.$route.params.id;
      try {
        await axios.put(`http://localhost:3333/alunos/${id}`, {
          nome: this.nome,
          oficina_id: this.oficinaSelecionada
        });
        this.$router.push({ name: 'alunos' });
      } catch (err) {
        alert('Erro ao salvar alterações!');
      }
    },
    voltar() {
      this.$router.back();
    }
  }
};
</script>

<style scoped src="../assets/alunosE.css"></style>
