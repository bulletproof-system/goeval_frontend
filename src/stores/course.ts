import { defineStore } from 'pinia';
import { CourseSet, CourseInfo } from '@/types/course';
import { post } from '@/api/index'

export const useCourseSet = defineStore("useCourseSet", {
	state: (): CourseSet => {
		return {
			search: [],
			recommend: [],
			star: [],
		}
	},
	actions: {
		async moreRecommend() {
			try {
				const response = await post<CourseInfo[]>('api/recommend', 20);
				console.log(response);
				this.recommend.push(...response.data);
			} catch (error) {
				console.log(error);
			}
			
		}
	}
});