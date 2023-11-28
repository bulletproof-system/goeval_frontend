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
	username: string;
	avatar: string;
	datetime: string;
	content: string;
	rating: number;
}

export interface CourseDetail {
	id: number;
	name: string;
	school: string;
	teacher: string[];
	reviews: Array<Review>;
	tag: string[];
	description: string;
}