import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/index.vue';

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
