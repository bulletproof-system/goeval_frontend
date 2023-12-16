import { createApp } from 'vue';
import App from '@/App.vue';
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/gobal.scss'

import { router } from '@/router/index';
import pinia from '@/stores/index';
import { i18n } from '@/i18n/index';


const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);

import { UserInfo } from '@/types/user'
import { useUserInfo } from '@/stores/userInfo'
import { get } from '@/api/index'
import { useThemeConfig } from './stores/themeConfig';

const userInfo = useUserInfo(pinia);
const themeConfig = useThemeConfig();

get<UserInfo>('/api/getInfo').then(res => {
	userInfo.login(res.data);
	// @ts-ignore
	if (router.currentRoute.value.meta.permission?.includes(userInfo.role))
		themeConfig.showLoginPanel = false;
});

app.mount('#app');