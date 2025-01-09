import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import PrimeVue from 'primevue/config';
// import Paginator from 'primevue/paginator';
import Aura from '@primevue/themes/aura';
import Noir from './presets/Noir.js';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
import './assets/main.css';

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import "vue-toastification/dist/index.css";




const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
    clientId:
        '31601836341-5foikqhai9h1ja6h31l45pd59ikf90ev.apps.googleusercontent.com',
});

const options = {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
};

app.use(router)
app.use(pinia)
app.use(Toast, options);
app.use(PrimeVue, {
    theme: {
        preset: Noir
    }
});
// app.component('Paginator', Paginator);

app.mount('#app')