<template>
	<div class="detail">
		<el-row>
			<el-col :span="18" :offset="3" v-if="courseInfo && userInfo">
				<infoBlock class="animate" :_courseInfo="courseInfo" :_courseStar="courseStar" :_userInfo="userInfo" />
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<!-- 使用两列布局展示评论 -->
			<!-- 左列 -->
			<el-col :span="9" :offset="3" v-if="userInfo">
				<div v-for="(comment, index) in leftReviews" :key="index" :id="`${comment.id}`">
					<reviewBlock class="animate" :reviewData="comment" :userInfo="userInfo" />
				</div>
			</el-col>
			<!-- 右列 -->
			<el-col :span="9" v-if="userInfo">
				<div v-for="(comment, index) in rightReviews" :key="index" :id="`${comment.id}`">
					<reviewBlock class="animate" :reviewData="comment" :userInfo="userInfo" />
				</div>
			</el-col>
		</el-row>
		<el-backtop :right="100" :bottom="100" />
	</div>
</template>

<script setup lang="ts">
import infoBlock from './infoBlock.vue';
import reviewBlock from './reviewBlock.vue';
import { post, get } from '@/api';
import { CourseDetail, CourseInfo, Review } from '@/types/course.ts';
import { router } from '@/router';
import { UserInfo } from '@/types/user';

const courseId = ref<Number>(0);
const courseDetail = ref<CourseDetail>();
const courseInfo = ref<CourseInfo>();
const reviews = ref<Review[]>([]);
const userInfo = ref<UserInfo>();
onMounted(async () => {
	try {
		// 接受路由参数courseId
		courseId.value = Number(router.currentRoute.value.params.course_id);

		const response = await post<CourseDetail>('/api/detail', {
			id: courseId,
		});
		// 控制台打印response以便调试
		console.log('response:', response);

		courseDetail.value = response.data;
		courseInfo.value = {
			id: response.data.id,
			name: response.data.name,
			school: response.data.school,
			teacher: response.data.teacher,
			tag: response.data.tag,
			description: response.data.description,
		}
		reviews.value = response.data.reviews;

		const response2 = await get<UserInfo>('/api/getInfo');
		userInfo.value = response2.data;

		// 接受路由参数reviewId以便定位
		const reviewId = Number(router.currentRoute.value.params.review_id);
		if (reviewId) {
			console.log("target reviewId:", reviewId.toString())
			// 页面滚动到指定评论
			const review = document.getElementById(reviewId.toString());
			console.log("got: ", review)
			if (review) {
				review.scrollIntoView();
			}
		}
	} catch (error) {
		console.error('Error fetching reviews:', error);
	}
});

// 计算平均评分
const courseStar = computed(() => {
	if (reviews.value.length == 0) return 0;
	let sum = 0;
	for (let i = 0; i < reviews.value.length; i++) {
		sum += reviews.value[i].rating;
	}
	sum /= reviews.value.length;
	// 保留一位小数
	return Math.round(sum * 10) / 10;
});

// 将评论数据分为左右两列
const leftReviews = computed(() => reviews.value.slice(0, Math.ceil(reviews.value.length / 2)));
const rightReviews = computed(() => reviews.value.slice(Math.ceil(reviews.value.length / 2)));

</script>

<style scoped>
.home {
	padding-left: 200px;
	padding-right: 200px;
}

.animate {
	animation-name: show;
	animation-duration: 2s;
}

@keyframes show {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>