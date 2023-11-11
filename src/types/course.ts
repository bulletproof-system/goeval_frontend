export interface CourseInfo {
	id: string;
	name: string;
	school: string;
	teacher: string[];

	// constructor(id: string, name: string, school: string, teacher: string[]) {
	// 	this.id = id;
	// 	this.name = name;
	// 	this.school = school;
	// 	this.teacher = teacher;
	// }
}

export interface CourseSet {
	search: Array<CourseInfo>;
	recommend: Array<CourseInfo>;
	star: Array<CourseInfo>;
}

export enum CompleteType {
	name,
	school,
	teacher,
	tag,
}

export interface CompleteResult {
	type: CompleteType,
	value: string,
}