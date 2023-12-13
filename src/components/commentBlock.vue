<template>
	<div :class="[{highlight: isActive}, 'comment']" ref="commentRef">
		<el-row>
			<el-col>
				<el-row>
					<el-col :span="4" class="avatar">
						<el-avatar :size="40" :src=comment.avatar />
					</el-col>
					<el-col :span="20" class="user-info">
						<p><strong>{{ comment.username }}</strong></p>
						<p>{{ comment.datetime.toLocaleString() }}</p>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" :offset="1" style="white-space: pre-wrap; word-break: break-all;">
						{{ comment.content }}
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
  
<script setup lang="ts">
import { Comment } from '@/types/course.ts';
// import { useI18n } from 'vue-i18n';

// const { d } = useI18n();

const props = defineProps<{
	commentData: Comment;
}>();

const comment = ref<Comment>(props.commentData);
const commentRef = ref<HTMLElement | null>(null);
const isActive = ref(false);

const scrollTo = () => {
	commentRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	setTimeout(() => { 
		isActive.value = true; 
		setTimeout(() => {
			isActive.value = false;
		}, 1000);
	}, 500);
}

defineExpose({
	scrollTo
})

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

@keyframes ani {
 from {
	background-color: var(--el-card-bg-color);
 }
 50% {
	background-color: darkorange;
 }
 to {
	background-color: var(--el-card-bg-color);
 }
}

.highlight {

 /* 设置高亮动画 */
 animation: ani 1s forwards;
}
</style>