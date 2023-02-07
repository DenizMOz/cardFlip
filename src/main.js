import { createApp } from 'vue';
import withUUID from 'vue-uuid';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
//PrimeVue component imports
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
//
import router from './router';
const app = withUUID(createApp(App));
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.component('Button', Button).component('InputText', InputText).component('Checkbox', Checkbox).component('Divider', Divider);
app.mount('#app');
