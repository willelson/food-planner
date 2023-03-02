import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/main.css';
import './registerServiceWorker';
import store from './store/index';

createApp(App).use(store).mount('#app');
