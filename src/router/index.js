import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import WelcomeView from '../views/WelcomeView.vue';
import ProductsView from '../views/ProductsView.vue';
import CartView from '../views/CartView.vue';
import OrdersView from '../views/OrdersView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AdminView from '../views/AdminView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: WelcomeView },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/orders', name: 'orders', component: OrdersView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/admin', name: 'admin', component: AdminView },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordView },
    { path: '/profile', name: 'profile', component: ProfileView }
  ]
});


router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  
  if (to.path === '/admin') {
    if (authStore.user && authStore.user.role === 'ROLE_ADMIN') {
      return true; 
    } else {
      return '/products'; 
    }
  }
  return true; 
});

export default router;