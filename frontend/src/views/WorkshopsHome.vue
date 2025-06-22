<template>
    <div class="main-content">
        <h2 class="page-title">Oficina</h2>
        <div class="search-container">
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="Busca por Nome" class="search-input" />
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div>
                <button class="new" @click="handleRouteNew">
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
                    <tr v-for="(workshop, index) in filteredWorkshops" :key="workshop.id" @click="handleRouteEdit(workshop.id)">
                        <td class="number">{{ index + 1 }}</td>
                        <td class="default">{{ workshop.name }}</td>
                        <td class="default">{{ workshop.id }}</td>
                        <td class="default">{{ workshop.teacher }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'WorkshopHome',
    data() {
        return {
            workshops: [],
            searchTerm: '',
        };
    },
    computed: {
        filteredWorkshops() {
            if (!this.searchTerm) return this.workshops;
            return this.workshops.filter(workshop =>
                workshop.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    mounted(){
        this.listWorkshops();
    },
    methods: {
        async listWorkshops() {
            try {
                const response = await api.get('/workshops');
                this.workshops = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error('Erro ao carregar oficinas:', error);
                this.workshops = [];
            }
        },
        handleRouteNew() {
            this.$router.push({ name: 'workshops-new' });
        },
        handleRouteEdit(id) {
            this.$router.push({ name: 'workshops-edit', params: { id } });
        }

    }
};
</script>

<style scoped src="../assets/workshopsH.css"></style>