import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
//PrimeVue component imports
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import router from './router';
const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.component('Button', Button).component('InputText', InputText).component('Checkbox', Checkbox);
app.mount('#app');
