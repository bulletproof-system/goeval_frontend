// import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory  } from 'vue-router';

const routes = [
	{ path: '/', redirect: '/home' },
	{ 	
		path: '/home', 
		component: () => import('@components/home.vue'),
		name: 'home',
	}, 
	{
		path: '/user',
		component: () => import('@components/user.vue'),
		name: 'user',
	},
	{
		path: '/star',
		component: () => import('@components/star.vue'),
		name: 'star',
		// beforeEnter: [checkLoginState]
	},
	{
		path: '/course/:course_id/:review_id/:comment_id?',
		component: () => import('@components/courseDetail.vue'),
		name: 'course',
	}
];

export const router = createRouter({
	history: createWebHistory(),
	routes
});