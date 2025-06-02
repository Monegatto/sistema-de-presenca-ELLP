import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ListaDePresenças from '@/views/ListaDePresenca.vue';
import OficinasHome from '@/views/OficinasHome.vue';
import AlunosHome from '@/views/AlunosHome.vue';
import OficinasNew from '@/views/OficinaNew.vue';
import AlunosNew from '@/views/AlunosNew.vue';
import OficinasEdit from '@/views/OficinaEdit.vue';
import AlunosEdit from '@/views/AlunosEdit.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/lista-presenca',
    name: 'lista-presenca',
    component: ListaDePresenças,
  },
  {
    path: '/oficinas',
    name: 'oficinas',
    component: OficinasHome,
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: AlunosHome,
  },
  {
    path: '/oficinas-nova',
    name: 'oficinas-nova',
    component: OficinasNew
  },
  {
    path: '/alunos-novo',
    name: 'alunos-novo',
    component: AlunosNew
  },
  {
    path: '/oficinas-editar/:id',
    name: 'oficinas-editar',
    component: OficinasEdit
  },
  {
    path: '/alunos-editar/:id',
    name: 'alunos-editar',
    component: AlunosEdit
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
