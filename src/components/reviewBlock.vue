<template>
	<div class="review">
		<el-row>
			<el-col>
				<el-card class="review-card" shadow="always">
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
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>
  
<script setup lang="ts">
import { Review } from '@/types/pinia'

// 定义组件接受的属性
const props = defineProps<{
	reviewData: Review; // reviewData 属性将传递评论数据
}>();

// 使用传递的评论数据作为组件内部的 review 数据
const review = ref<Review>(props.reviewData);

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