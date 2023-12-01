// import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory  } from 'vue-router';
import { UserRole } from '@/types/user';

const routes = [
	{ path: '/', redirect: '/home' },
	{ 	
		path: '/home', 
		component: () => import('@components/home.vue'),
		name: 'home',
		meta: {
			permission: [UserRole.Visitor, UserRole.User, UserRole.Administrator]
		}
	}, 
	{
		path: '/user',
		component: () => import('@components/user.vue'),
		name: 'user',
		meta: {
			permission: [UserRole.User, UserRole.Administrator]
		}
	},
	{
		path: '/star',
		component: () => import('@components/star.vue'),
		name: 'star',
		meta: {
			permission: [UserRole.User, UserRole.Administrator]
		}
		// beforeEnter: [checkLoginState]
	},
	{
		path: '/manage',
		component: () => import('@/components/manage/index.vue'),
		children: [
			{
				path: '', redirect: '/manage/user'
			},
			{
				path: 'user',
				component: () => import('@/components/manage/user.vue'),
				meta: {
					permission: [UserRole.Administrator]
				}
			},
			{
				path: 'course',
				component: () => import('@/components/manage/course.vue'),
				meta: {
					permission: [UserRole.Administrator]
				}
			},
			{
				path: 'announcement',
				component: () => import('@/components/manage/announcement.vue'),
				meta: {
					permission: [UserRole.Administrator]
				}
			}
		]
	},
	{
		path: '/course/:course_id/:review_id?/:comment_id?',
		component: () => import('@components/detailPage.vue'),
		name: 'course',
		meta: {
			permission: [UserRole.Visitor, UserRole.User, UserRole.Administrator]
		}
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes
});