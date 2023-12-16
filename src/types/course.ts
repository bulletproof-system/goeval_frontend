export interface CourseInfo {
	id: number;
	name: string;
	school: string;
	teacher: string[];
	tag: string[];
	description: string;
}

export interface CourseSet {
	search: Array<CourseInfo>;
	recommend: Array<CourseInfo>;
	star: Array<CourseInfo>;
}

export enum TagType {
	course,
	school,
	teacher,
	tag,
}

export interface CompleteResult {
	type: TagType,
	value: string,
}

export interface Review {
	id: number;
	username: string;
	avatar: string;
	datetime: Date;
	content: string;
	rating: number;
}

export interface ReviewExtended {
	id: number;
	username: string;
	avatar: string;
	datetime: Date;
	content: string;
	rating: number;
	count: number;
	liked: boolean;
}

export interface CourseDetail {
	id: number;
	name: string;
	school: string;
	teacher: string[];
	reviews: Array<ReviewExtended>;
	tag: string[];
	description: string;
	collected: boolean;
}

export interface Comment {
	id: number;
	username: string;
	avatar: string;
	datetime: Date;
	content: string;
}