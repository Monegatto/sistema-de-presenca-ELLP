import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ListaDePresenças from '@/views/ListaDePresenca.vue';
import RelatorioPresenca from '@/views/RelatorioPresenca.vue';

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
    path: '/relatorio-presenca',
    name: 'relatorio-presenca',
    component: RelatorioPresenca,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
