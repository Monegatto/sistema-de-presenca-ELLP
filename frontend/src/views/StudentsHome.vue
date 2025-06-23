<template>
    <div class="main-content">
        <h2 class="page-title">Alunos</h2>
        <div class="search-container">
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="Busca por Nome" class="search-input" />
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div>
                <button class="new" @click="handleRouteNew">
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
                    <tr v-for="(student, index) in filteredStudents" :key="student.id" @click="handleRouteEdit(student.id)">
                        <td class="number">{{ index + 1 }}</td>
                        <td class="default">{{ student.name }}</td>
                        <td class="default">{{ student.id }}</td>
                        <td class="default">{{ getWorkshopName(student.workshopId) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'StudentsHome',
    data() {
        return {
            students: [],
            workshops: [],
            searchTerm: '',
        };
    },
    computed: {
        filteredStudents() {
            if (!this.searchTerm) return this.students;
            return this.students.filter(student =>
                student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    mounted(){
        this.listStudents();
        this.listWorkshops();
    },
    methods: {
        async listStudents() {
            try {
                const response = await api.get('/students');
                this.students = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error('Erro ao carregar alunos:', error);
                this.students = [];
            }
        },
        async listWorkshops() {
            try {
                const response = await api.get('/workshops');
                this.workshops = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                console.error('Erro ao carregar oficinas:', error);
                this.workshops = [];
            }
        },
        getWorkshopName(workshopId) {
            const workshop = this.workshops.find(w => w.id === workshopId);
            return workshop ? workshop.name : 'N/A';
        },
        handleRouteNew() {
            this.$router.push({ name: 'students-new' });
        },
        handleRouteEdit(id) {
            this.$router.push({ name: 'students-edit', params: { id } });
        }
    }
};
</script>

<style scoped src="../assets/studentsH.css"></style>