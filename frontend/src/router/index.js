import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import AttendanceListing from '@/views/AttendanceListing.vue';
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
    path: '/attendance-listing',
    name: 'attendance-listing',
    component: AttendanceListing,
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
  const expiration = localStorage.getItem('token_expiration')
  const authRequired = !publicPages.includes(to.path)

  const now = Date.now();

  if (expiration && now > parseInt(expiration)) {
    localStorage.removeItem('token')
    localStorage.removeItem('token_expiration')
    return next('/')
  }

  if (authRequired && !token) {
    return next('/')
  }

  if (!authRequired && token) {
    return next('/attendance-listing')
  }

  next()
})

export default router;
