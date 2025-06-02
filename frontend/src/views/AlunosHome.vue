<template>
    <div class="main-content">
        <h2 class="page-title">Alunos</h2>
        <div class="search-container">
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="Busca por Nome" class="search-input" />
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div>
                <button class="new" @click="handleRoute">
                    Novo Aluno
                </button>
            </div>
        </div>
        <div class="content-box">
            <table class="table">
                <thead>
                    <tr>
                    <th class="number">#</th>
                    <th class="default">Estudante</th>
                    <th class="default">ID do Estudante</th>
                    <th class="default">Oficina Matriculada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(aluno, index) in filteredAlunos" :key="aluno.id">
                        <td class="number">{{ index + 1 }}</td>
                        <td class="default">{{ aluno.nome }}</td>
                        <td class="default">{{ aluno.id }}</td>
                        <td class="default">{{ aluno.oficina_id }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AlunosHome',
    data() {
        return {
            alunos: [],
            searchTerm: '',
        };
    },
    computed: {
        filteredAlunos() {
            if (!this.searchTerm) return this.alunos;
            return this.alunos.filter(aluno =>
                aluno.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    mounted(){
        this.carregarAlunos();
    },
    methods: {
        async carregarAlunos() {
            try {
                const response = await axios.get('http://localhost:3333/alunos');
                this.alunos = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error('Erro ao carregar alunos:', error);
                this.alunos = [];
            }
        },
        handleRoute() {
            this.$router.push({ name: 'alunos-novo' });
        }
    }
};
</script>

<style scoped src="../assets/alunosH.css"></style>