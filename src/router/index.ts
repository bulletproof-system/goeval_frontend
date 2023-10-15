import { defineAsyncComponent } from 'vue';
import { RouteLocationNormalized, createRouter, createWebHistory  } from 'vue-router';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';

// const userInfo = useUserInfo();
// const themeConfig = useThemeConfig();

// function checkLoginState(to: RouteLocationNormalized, from: RouteLocationNormalized) {
// 	if (userInfo.login) return true;
// 	themeConfig.showLoginPanel = true;
// 	return false;
// }

const routes = [
	{ path: '/', redirect: '/home' },
	{ 	
		path: '/home', 
		component: defineAsyncComponent(() => import('@components/home.vue')),
		name: 'home',
	}, 
	{
		path: '/user/:uid',
		component: defineAsyncComponent(() => import('@components/user.vue')),
		name: 'user',
	},
	{
		path: '/login',
		component: defineAsyncComponent(() => import('@components/login.vue')),
		name: 'login',
	},
	{
		path: '/star',
		component: defineAsyncComponent(() => import('@components/star.vue')),
		name: 'star',
		// beforeEnter: [checkLoginState]
	}
];

export const router = createRouter({
	history: createWebHistory(),
	routes
});