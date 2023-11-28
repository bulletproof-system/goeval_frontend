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
						<el-col :span="2" :offset="22">
							<el-button type="primary" size="small" @click="addComment">回复</el-button>
						</el-col>
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

		<!-- 评论表单弹窗 -->
		<el-dialog v-model="replyFormVisible" title="回复评价" width="40%" :before-close="handleClose">
			<span>
				<el-form label-width="20%">
					<el-form-item label="内容">
						<el-input v-model="replyPost.content" type="textarea" :rows="10" placeholder="请输入回复内容"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="replyFormVisible = false">取消</el-button>
					<el-button type="primary" @click="submitReply">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
  
<script setup lang="ts">
import { Review, Comment } from '@/types/course.ts';
import { post, get } from '@/api';
import { UserInfo } from '@/types/user'

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

onMounted(async () => {
	review.value = props.reviewData;
	commentPost.reviewId = review.value.id;
	const response = await get<UserInfo>('/api/getInfo');
	replyPost.username = response.data.username;
	replyPost.id = review.value.id;
	replyPost.avatar = response.data.avatar;
});

// 获取评论区
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


interface ReplyPost {
	id: number;
	username: string;
	content: string;
	avatar: string;	// 头像不会发送到后端，只是用来临时显示
}

interface ReplyResponse {
	ret: number;
}

const replyFormVisible = ref(false);
const replyPost = reactive<ReplyPost>({
	id: 0,
	username: '',
	content: '',
	avatar: '',
});

// 显示评论表单
async function addComment() {
	replyFormVisible.value = true;
}

// 关闭评论表单
const handleClose = (done: () => void) => {
	// 提醒是否确认
	ElMessageBox.confirm('确认关闭? ')
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		})
}

// 提交评论
async function submitReply() {
	console.log('replyPost: ', replyPost);

	// 前端检查内容是否为空
	if (replyPost.content == '') {
		ElMessage({
			message: '回复内容不能为空',
			type: 'error',
		});
		return;
	}

	// 向后端发送评论的请求
	const response = await post<ReplyResponse>('/api/reply', replyPost);

	// 根据后端返回的数据，弹出不同的提示
	if (response.data.ret == 1) {
		ElMessage({
			message: '评论成功',
			type: 'success',
		});
		comments.push({
			id: replyPost.id,
			username: replyPost.username,
			content: replyPost.content,
			datetime: new Date().toLocaleString(),
			avatar: replyPost.avatar,
		});
		replyFormVisible.value = false;
	} else {
		ElMessage({
			message: '评论失败',
			type: 'error',
		});
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