import UnauthorizedPage from './components/UnauthorizedPage.vue';
import LoginFormVue from './components/User/LoginForm.vue';
import RegisterForm from './components/User/RegisterForm.vue';
import AdminDashboard from './components/Admin/AdminDashboard.vue'; // Nouveau composant pour le tableau de bord de l'admin
import AllUsers from './components/Admin/AllUsers.vue'; // Nouveau composant pour voir tous les utilisateurs
import AddUser from './components/Admin/AddUser.vue'; // Nouveau composant pour ajouter un utilisateur
import EditUser from './components/Admin/EditUser.vue'; // Nouveau composant pour modifier un utilisateur
import infoUser from './components/User/infoUser.vue';
import profileUser from './components/User/profileUser.vue';
import createClock from './components/Clocks/createClock.vue';
import workingsTime from './components/Clocks/workingsTime.vue';
import DashbodrUser from './components/DashbodrUser.vue';
import MesCharts from './components/Charts/MesCharts.vue';
import { createRouter, createWebHistory } from "vue-router";

// Fonction pour vérifier si l'utilisateur est authentifié
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Navigation guard pour les routes protégées
const requireAuth = (to, from, next) => {
  if (isAuthenticated()) {
    next();
  } else {
    next('/unauthorized');
  }
};

// Navigation guard pour les routes administratives
const requireAdmin = (to, from, next) => {
  if (isAuthenticated()) {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      next();
    } else {
      next('/unauthorized'); // Redirigez les utilisateurs non administrateurs vers la page non autorisée
    }
  } else {
    next('/unauthorized');
  }
};

const routes = [
  {
    path: '/',
    component: LoginFormVue,
    name: 'login',
    props: true,
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedPage,
    props: true,
  },
  {
    path:'/register',
    name: 'register',
    component: RegisterForm,
    props: true,
  },
  {
    path: '/user/:id/show',
    name: 'infoUser',
    component: infoUser,
    props: true,
    beforeEnter: requireAuth,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashbodrUser,
        props: true
      },
      {
        path: 'charts',
        name: 'charts',
        component: MesCharts,
        props: true
      },
      {
        path: 'profile',
        name: 'profile',
        component: profileUser,
        props: true
      },
      {
        path: 'clock',
        name: 'clock',
        component: createClock,
        props: true
      },
      {
        path: 'working_time',
        name: 'working_time',
        component: workingsTime,
        props: true
      }
    ]
  },
  {
    path: '/admin/:id',
    name:'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: requireAdmin,
    children: [
      {
        path: 'users',
        name: 'allUsers',
        component: AllUsers,
        props: true,
      },
      {
        path: 'add-user',
        name: 'addUser',
        component: AddUser,
        props: true,
      },
      {
        path: 'edit-user/:userId',
        name: 'editUser',
        component: EditUser,
        props: true,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
