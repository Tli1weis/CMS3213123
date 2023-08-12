import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import 'normalize.css';
import '@/assets/css/index.css';
import router from './router';
import store from './store';
import createIcon from './global/registerIcon';

createApp(App).use(createIcon).use(store).use(router).mount('#app');
