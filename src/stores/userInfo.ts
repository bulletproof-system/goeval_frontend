import { defineStore } from 'pinia';
import { UserRole, UserInfo } from '@/types/user.ts';

export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfo => ({ 
		userName: '',
		avatar: '',
		email: '',
		role: UserRole.Visitor,
	}),
	actions: {
	}
});