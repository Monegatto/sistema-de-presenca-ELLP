<template>
    <div class="main-content">
        <h2 class="page-title">Usuários</h2>
        <div class="search-container">
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="Busca por Nome" class="search-input" />
                <font-awesome-icon icon="search" class="search-icon" />
            </div>
            <div>
                <button class="new" @click="handleRouteNew">
                    Novo usuário
                </button>
            </div>
        </div>
        <div class="content-box">
            <table class="table">
                <thead>
                    <tr>
                    <th class="number">#</th>
                    <th class="default">Usuário</th>
                    <th class="default">ID do Usuário</th>
                    <th class="default">Tipo de Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(teacher, index) in filteredTeachers"
                        :key="teacher.id"
                        @click="handleRouteEdit(teacher.id)"
                        :class="{ 'forgot-password-row': teacher.forgotPassword }"
                    >
                        <td class="number">{{ index + 1 }}</td>
                        <td class="default">{{ teacher.name }}</td>
                        <td class="default">{{ teacher.id }}</td>
                        <td class="default">Professor</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'UsersHome',
    data() {
        return {
            teachers: [],
            searchTerm: '',
        };
    },
    computed: {
        filteredTeachers() {
            if (!this.searchTerm) return this.teachers;
            return this.teachers.filter(teacher =>
                teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    mounted(){
        this.listTeachers();
    },
    methods: {
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
            this.$router.push({ name: 'users-new' });
        },
        handleRouteEdit(id) {
            this.$router.push({ name: 'users-edit', params: { id } });
        }
    }
};
</script>

<style scoped src="../assets/usersH.css"></style>
<style scoped>
.forgot-password-row {
    background-color: #ff3b3b !important;
    color: #fff;
}
</style>