
declare interface ThemeConfig {
	showLoginPanel: boolean
}

declare interface UserInfo {
	login: boolean;
	userName: string | undefined;
	avatar: string | undefined;
	email: string | undefined;
	permission: [string] | undefined;
}