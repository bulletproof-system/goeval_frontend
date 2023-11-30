<template>
	<div class="comment">
		<el-row>
			<el-col>
				<el-row>
					<el-col :span="4" class="avatar">
						<el-avatar :size="20" :src=comment.avatar />
					</el-col>
					<el-col :span="20" class="user-info">
						<p><strong>{{ comment.username }}</strong></p>
						<p>{{ comment.datetime }}</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" :offset="1">{{ comment.content }}</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
  
<script setup lang="ts">
import { Comment } from '@/types/course.ts';

const props = defineProps<{
	commentData: Comment;
}>();

const comment = ref<Comment>(props.commentData);
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