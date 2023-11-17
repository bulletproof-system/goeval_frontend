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

export enum MessageStatus {
	read = 0,
	unread = 1
}

export enum NotificationType {
	star = 0,		// 收藏的课程有新评价
	review = 1,		// 评价下有新回复
}

export interface Announcement {
	aid: Number;
	title: string;
	content: string;
	datetime: Date;
}

export interface Notification {
	nid: Number;
	course_id: Number;
	course_name: string;
	review_id: Number;
	comment_id?: Number;
	datetime: Date;
	status: MessageStatus;
	ntype: NotificationType;
}

export interface UserMessage {
	announcements: Announcement[],
	notifications: Notification[],
}