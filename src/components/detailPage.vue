<template>
	<div class="detail" v-loading="loading">
		<el-row>
			<el-col :span="18" :offset="3" v-if="courseInfo">
				<infoBlock class="animate" :_courseInfo="courseInfo" 
				:_courseStar="courseStar" :_collected="collected" />
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<!-- 使用两列布局展示评论 -->
			<!-- 左列 -->
			<el-col :span="9" :offset="3">
				<div v-for="(comment, index) in leftReviews" :key="index" :id="`${comment.id}`">
					<reviewBlock class="animate" :reviewData="comment" :ref="(el) => ReviewRefs[comment.id] = el"/>
				</div>
			</el-col>
			<!-- 右列 -->
			<el-col :span="9">
				<div v-for="(comment, index) in rightReviews" :key="index" :id="`${comment.id}`">
					<reviewBlock class="animate" :reviewData="comment" :ref="(el) => ReviewRefs[comment.id] = el"/>
				</div>
			</el-col>
		</el-row>
		<el-backtop :right="100" :bottom="100" />
	</div>
</template>

<script setup lang="ts">
import infoBlock from './infoBlock.vue';
import reviewBlock from './reviewBlock.vue';
import { post } from '@/api';
import { CourseDetail, CourseInfo, ReviewExtended } from '@/types/course.ts';
import { router } from '@/router';

const courseId = ref<Number>(0);
const courseDetail = ref<CourseDetail>();
const courseInfo = ref<CourseInfo>();
const reviews = ref<ReviewExtended[]>([]);
const collected = ref<boolean>(false);
const ReviewRefs = reactive<{ [key: number]: any }>({});
const loading = ref(false);
onMounted(
	() => {loadPage();}
);
onUnmounted(() => {
	courseDetail.value = undefined;
	courseInfo.value = undefined;
	reviews.value = [];
	collected.value = false;
})

watch(
	// 检测路由两个参数的变化
	() => [router.currentRoute.value.params.course_id, router.currentRoute.value.params.review_id],
	() => {
		// 控制台输出
		console.log("route changed");
		// 刷新页面
		loadPage();
		// location.reload();
	}
);

const loadPage = async () => {
	loading.value = true;
	try {
		// 接受路由参数courseId
		courseId.value = Number(router.currentRoute.value.params.course_id);
		console.log("courseId:", courseId.value);

		const response = await post<CourseDetail>('/api/detail', {
			id: courseId.value,
		});

		courseDetail.value = response.data;
		courseInfo.value = {
			id: response.data.id,
			name: response.data.name,
			school: response.data.school,
			teacher: response.data.teacher,
			tag: response.data.tag,
			description: response.data.description,
		}
		collected.value = response.data.collected;
		reviews.value = response.data.reviews;

		// 接受路由参数reviewId以便定位
		const reviewId = Number(router.currentRoute.value.params.review_id);
		const commentId = Number(router.currentRoute.value.params.comment_id);
		await nextTick();
		await nextTick();
		const reviewRef = ReviewRefs[reviewId];
		reviewRef?.srcollTo(commentId);
	} catch (error) {
		console.error('Error fetching reviews:', error);
	} finally {
		loading.value = false;
	}
}

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
.detail {
	height: inherit;
}

.home {
	padding-left: 200px;
	padding-right: 200px;
}

.animate {
	animation-name: show;
	animation-duration: 0s;
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