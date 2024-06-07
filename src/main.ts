import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.config.globalProperties.$http = axios;
app.config.globalProperties.$http.defaults.baseURL = 'http://localhost:3000';

app.mount('#app');

