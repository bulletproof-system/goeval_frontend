import { defineStore } from 'pinia';
import { UserRole, UserInfo, UserMessage, MessageStatus, Announcement, Notification } from '@/types/user.ts';
import { get, post } from '@/api/index'
import { Local } from '@/utils/storage';
import { router } from '@/router';

export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfo => {
		return {
			username: '',
			avatar: 'http://dummyimage.com/100x100/FF0000/000000&text=Visitor',
			email: '',
			role: UserRole.Visitor,
		};
	},
	actions: {
		login(info: UserInfo, token?: string) {
			this.$patch(info);
			if (token)
				Local.set('Bearer', {Bearer : `Bearer ${token}`});
		},
		logout() {
			this.$patch({
				username: '',
				avatar: 'http://dummyimage.com/100x100/FF0000/000000&text=Visitor',
				email: '',
				role: UserRole.Visitor,
			});
			Local.remove('Bearer');
			router.push({ name: 'home' });
		}
	}
});

export const useMessage = defineStore('userMessage', {
	state: (): UserMessage => {
		return {
			announcements: [],
			notifications: []
		}
	},
	actions: {
		async getAnnouncements() {
			await get<Announcement[]>('api/announcement').then((res) => {
				this.announcements = res.data;
			})
		},
		async getNotifications() {
			await get<Notification[]>('api/notification').then((res) => {
				this.notifications = res.data;
			})
		},
		async readNotification(index: number) {
			this.notifications[index].status = MessageStatus.read;
			let nid = this.notifications[index].nid
			await post('api/read', nid).then((res) => {
				console.log(`read notification ${nid} ${res.data == true ? 'success' : 'fail'}`)
			});
		}
	},
	getters: {
		getUnread() {
			let num = 0;
			this.notifications.forEach(item => {
				if (item.status == MessageStatus.unread)
					++num;
			})
			return num;
		}
	}
});