export const enum UserRole {
	Visitor = 0,
	User = 1,
	Administrator = 2
}

export interface UserInfo {
	userName: string;
	avatar: string;
	email: string | undefined;
	role: UserRole;
}