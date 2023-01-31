import { createRouter, createWebHistory } from 'vue-router';
import CardSettings from '../pages/CardSettingsView.vue';
import Game from '../pages/GameView.vue';

const routes = [
    {
        path: '/',
        name: 'card-settings',
        component: CardSettings
    },
    {
        path: '/game',
        name: 'game',
        component: Game
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
