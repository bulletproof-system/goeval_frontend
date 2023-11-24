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
		path: '/manage',
		component: () => import('@/components/manage/index.vue'),
		name: 'manage',
		children: [
			{
				path: '', redirect: '/manage/user'
			},
			{
				path: 'user',
				component: () => import('@/components/manage/user.vue'),
			},
			{
				path: 'course',
				component: () => import('@/components/manage/course.vue'),
			},
			{
				path: 'announcement',
				component: () => import('@/components/manage/announcement.vue'),
			}
		]
	},
	{
		path: '/course/:course_id/:review_id/:comment_id?',
		component: () => import('@components/courseDetail.vue'),
		name: 'course',
	},
	{
		path:'/home/detail',
		component: defineAsyncComponent(() => import('@components/detailPage.vue')),
		name: 'detail',
	}
];

export const router = createRouter({
	history: createWebHistory(),
	routes
});