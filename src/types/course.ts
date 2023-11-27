export interface CourseInfo {
	id: number;
	name: string;
	school: string;
	teacher: string[];
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