import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
//PrimeVue component imports
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
//
import router from './router';
const app = createApp(App);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.component('Button', Button).component('InputText', InputText).component('Checkbox', Checkbox).component('Divider', Divider).component('BlockUI', BlockUI).component('Dropdown', Dropdown);
app.mount('#app');
