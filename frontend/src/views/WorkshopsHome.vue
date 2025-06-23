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
                    <th class="default">Horário</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(workshop, index) in filteredWorkshops" :key="workshop.id" @click="handleRouteEdit(workshop.id)">
                        <td class="number">{{ index + 1 }}</td>
                        <td class="default">{{ workshop.name }}</td>
                        <td class="default">{{ workshop.id }}</td>
                        <td class="default">{{ getWorkshopTeacherName(workshop.teacher) }}</td>
                        <td class="default">{{ workshop.startTime }}</td>
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
            teachers: [],
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
    mounted() {
    this.listWorkshops();
    this.listTeachers();
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
        async listTeachers() {
            try {
                const response = await api.get('/teachers');
                this.teachers = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error('Erro ao carregar professores:', error);
                this.teachers = [];
            }
        },
        handleRouteNew() {
            this.$router.push({ name: 'workshops-new' });
        },
        handleRouteEdit(id) {
            this.$router.push({ name: 'workshops-edit', params: { id } });
        },
        getWorkshopTeacherName(teacherId) {
            const teacher = this.teachers.find(t => t.id === teacherId);
            return teacher ? teacher.name : 'N/A';
        },
    }
};
</script>

<style scoped src="../assets/workshopsH.css"></style>