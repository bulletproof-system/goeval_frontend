import { defineStore } from 'pinia';

export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfo => ({ 
		login : false,
		userName : undefined,
		avatar: undefined,
		email: undefined,
		permission: undefined,
	}),
});