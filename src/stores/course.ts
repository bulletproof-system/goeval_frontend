import { defineStore } from 'pinia';
import { CourseSet, CourseInfo } from '@/types/course';
import { post, get } from '@/api/index'

function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const useCourseSet = defineStore("useCourseSet", {
	state: (): CourseSet => {
		return {
			search: [],
			recommend: [],
			star: [],
		}
	},
	actions: {
		clearRecommend() {
			this.recommend.splice(0, this.recommend.length);
		},
		async moreRecommend(ms: number = 0) {
			try {
				const response = await post<CourseInfo[]>('api/recommend', {"num" : 10});
				for (let i = 0; i < response.data.length; ++i) {
					await sleep(ms);
					this.recommend.push(response.data[i]);
				}
			} catch (error) {
				console.log(error);
			}
			
		},
		clearSearch() {
			this.search.splice(0, this.search.length);
		},
		async searchCourse(keyword: string, ms: number = 0) {
			try {
				this.clearSearch();
				const response = await post<CourseInfo[]>('api/search', {"key" : keyword});
				for (let i = 0; i < response.data.length; ++i) {
					await sleep(ms);
					this.search.push(response.data[i]);
				}
			} catch (error) {
				console.log(error);
			}
		},
		clearStar() {
			this.star.splice(0, this.star.length);
		},
		async getStarList(ms: number = 0) {
			try {
				const response = await get<CourseInfo[]>('api/starlist');
				this.clearStar();
				for (let i = 0; i < response.data.length; ++i) {
					await sleep(ms);
					this.star.push(response.data[i]);
				}
			} catch (error) { console.log(error); }
		}
	}
});