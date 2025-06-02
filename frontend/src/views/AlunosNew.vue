<template>
  <div class="main-content">
    <h2 class="page-title">Cadastrar Aluno</h2>
    <div class="content-box">
      <form class="form-group" @submit.prevent="cadastrarOficina">
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
          <button class="new" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlunosNew',
    data() {
    return {
        nome: '',
        oficinaSelecionada: '', // será o ID da oficina
        oficinas: []
    };
    },
    mounted() {
    this.carregarOficinas();
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
    async cadastrarOficina() {
        try {
        await axios.post('http://localhost:3333/alunos', {
            nome: this.nome,
            oficina_id: this.oficinaSelecionada
        });
        this.$router.push({ name: 'oficinas' });
        } catch (error) {
        alert('Erro ao cadastrar aluno!');
        }
    }
    }
};
</script>

<style scoped src="../assets/oficinaN.css"></style>
