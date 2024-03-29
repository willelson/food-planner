import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/main.css';
import './registerServiceWorker';
import store from './store/index';
import router from './router/index';


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app');
