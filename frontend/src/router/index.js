import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ListaDePresenças from '@/views/ListaDePresenca.vue';
import WorkshopHome from '@/views/WorkshopsHome.vue';
import StudentsHome from '@/views/StudentsHome.vue';
import WorkshopNew from '@/views/WorkshopsNew.vue';
import StudentsNew from '@/views/StudentsNew.vue';
import WorkshopsEdit from '@/views/WorkshopsEdit.vue';
import StudentsEdit from '@/views/StudentsEdit.vue';
import UsersHome from '@/views/UsersHome.vue';
import UsersNew from '@/views/UsersNew.vue';
import UsersEdit from '@/views/UsersEdit.vue';
import Report from '@/views/Report.vue';

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
    path: '/workshops',
    name: 'workshops',
    component: WorkshopHome,
  },
  {
    path: '/students',
    name: 'students',
    component: StudentsHome,
  },
  {
    path: '/workshops-new',
    name: 'workshops-new',
    component: WorkshopNew
  },
  {
    path: '/students-new',
    name: 'students-new',
    component: StudentsNew
  },
  {
    path: '/workshops-edit/:id',
    name: 'workshops-edit',
    component: WorkshopsEdit
  },
  {
    path: '/students-edit/:id',
    name: 'students-edit',
    component: StudentsEdit
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/users',
    name: 'users',
    component: UsersHome
  },
  {
    path: '/users-new',
    name: 'users-new',
    component: UsersNew
  },
  {
    path: '/users-edit/:id',
    name: 'users-edit', 
    component: UsersEdit
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const publicPages = ['/']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !token) {
    return next('/')
  }

  if (!authRequired && token) {
    return next('/lista-presenca')
  }

  next()
})

export default router;
