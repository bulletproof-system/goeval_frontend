<template>
	<div class="review">
		<el-row>
			<el-col>
				<el-card class="review-card" shadow="always" v-if="review">
					<el-row>
						<el-col :span="4" class="avatar">
							<el-avatar :size="50" :src=review.avatar />
						</el-col>
						<el-col :span="20" class="user-info">
							<p><strong>{{ review.username }}</strong></p>
							<p>{{ review.datetime }}</p>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="23" :offset="1">
							<el-rate v-model="review.rating" disabled></el-rate>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="23" :offset="1">{{ review.content }}</el-col>
					</el-row>
					<p></p>
					<el-row>
						<el-col :span="23" :offset="1">
							<el-collapse>
								<el-collapse-item title="评论区" name="1" @click="fetchComments">
									<commentBlock v-for="(comment, index) in comments" :key="index"
										:commentData="comment" />
								</el-collapse-item>
							</el-collapse>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>
  
<script setup lang="ts">
import { Review, Comment } from '@/types/course.ts';
import { post } from '@/api';

interface commentPost {
	reviewId: number;
}

interface commentResponse {
	comments: Comment[];
}

// 定义组件接受的属性
const props = defineProps<{
	reviewData: Review;
}>();

const review = ref<Review>();
const comments = reactive<Comment[]>([]);
const commentPost = reactive<commentPost>({
	reviewId: 0,
});

onMounted(() => {
	review.value = props.reviewData;
	commentPost.reviewId = review.value.id;
});

const isFirstClick = ref(true);
async function fetchComments() {
	if (isFirstClick.value) {
		isFirstClick.value = false;
		try {
			console.log('fetchComments for review:', commentPost.reviewId);
			const response = await post<commentResponse>('/api/comments', commentPost);
			comments.push(...response.data.comments);
		} catch (error) {
			console.error('Failed to fetch comments:', error);
		}
	} else {
		return;
	}
}



</script>
  
<style scoped>
.review-card {
	margin-bottom: 20px;
}

.avatar {
	display: flex;
	align-items: center;
	justify-content: center;
}

.user-info {
	display: flex;
	flex-direction: column;
	line-height: 0.1;
}
</style>