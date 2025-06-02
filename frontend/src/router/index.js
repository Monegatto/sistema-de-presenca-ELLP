import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ListaDePresenças from '@/views/ListaDePresenca.vue';
import OficinasHome from '@/views/OficinasHome.vue';
import AlunosHome from '@/views/AlunosHome.vue';
import OficinasNew from '@/views/OficinaNew.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
