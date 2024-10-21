// Вместо импорта 'Vue', импортируем необходимые функции из 'vue' и 'vue-router'
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Transactions from '@/views/Transactions.vue';
import AddTransaction from '@/views/AddTransaction.vue';
import Analytics from '@/views/Analytics.vue';
import Profile from '@/views/Profile.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/add-transaction', name: 'AddTransaction', component: AddTransaction },
  { path: '/analytics', name: 'Analytics', component: Analytics },
  { path: '/profile', name: 'Profile', component: Profile }
];

// Создаем новый экземпляр роутера с использованием функции createRouter
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // История навигации через Web History API
  routes,
});

export default router;
