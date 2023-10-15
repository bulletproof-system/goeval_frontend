import { createApp } from 'vue';
import App from '@/App.vue';
import '@/styles/gobal.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { router } from '@/router/index';
import pinia from '@/stores/index';
import { i18n } from '@/i18n/index';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
