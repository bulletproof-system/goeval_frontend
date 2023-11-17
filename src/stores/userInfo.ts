import { defineStore } from 'pinia';
import { UserRole, UserInfo, UserMessage, MessageStatus, Announcement, Notification } from '@/types/user.ts';
import { get, post } from '@/api/index'

export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfo => {
		return {
			userName: '',
			avatar: '',
			email: '',
			role: UserRole.Visitor,
		}
	},
	actions: {
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