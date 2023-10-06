import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{ 	
		path: '/', 
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
	}
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes
});