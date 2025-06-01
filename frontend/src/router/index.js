import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ListaDePresenças from '@/views/ListaDePresenca.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
