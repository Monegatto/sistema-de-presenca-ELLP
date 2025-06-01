<template>
    <div class="main-content">
        <h2 class="page-title">Oficina</h2>
        <div class="search-container">
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="Busca por Nome" class="search-input" />
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div>
                <button class="new">
                    Nova Oficina
                </button>
            </div>
        </div>
        <div class="content-box">
            <table class="table">
                <thead>
                    <tr>
                    <th class="number">#</th>
                    <th class="default">Oficina</th>
                    <th class="default">ID da Oficina</th>
                    <th class="default">Responsável</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(oficina, index) in filteredOficinas" :key="oficina.id">
                        <td class="number">{{ index + 1 }}</td>
                        <td class="default">{{ oficina.nome }}</td>
                        <td class="default">{{ oficina.id }}</td>
                        <td class="default">{{ oficina.coordenador }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'OficinasHome',
    data() {
        return {
            oficinas: [],
            searchTerm: '',
        };
    },
    computed: {
        filteredOficinas() {
            if (!this.searchTerm) return this.oficinas;
            return this.oficinas.filter(oficina =>
                oficina.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    mounted(){
        this.carregarOfinicas();
    },
    methods: {
        async carregarOfinicas() {
            try {
                const response = await axios.get('http://localhost:3333/oficinas');
                this.oficinas = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error('Erro ao carregar oficinas:', error);
                this.oficinas = [];
            }
        }
    }
};
</script>

<style scoped src="../assets/oficinaH.css"></style>