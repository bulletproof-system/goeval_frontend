import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory  } from 'vue-router';

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
	},
	{
		path:'/home/detail',
		component: defineAsyncComponent(() => import('@components/detailPage.vue')),
		name: 'detail',
	},
	{
		path:'/temp',
		component: defineAsyncComponent(() => import('@components/temp.vue')),
		name: 'temp',
	}
];

export const router = createRouter({
	history: createWebHistory(),
	routes
});