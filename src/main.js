import { createApp } from 'vue';
import './style/style.scss';
import App from './App.vue';
import router from './router/index.js';
import '@/utils/mobileRem.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'vue-color/style.css';
import { clickOut } from '@/directive/index.js';

const app = createApp(App);
app.directive('click-out', clickOut);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
