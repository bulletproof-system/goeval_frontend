<template>
	<div class="review" ref="reviewRef">
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
					<!-- 增加col间距 -->
					<el-row>
						<el-col :span="3" :offset="17">
							<el-button type='' text size="small" @click="toggleLike">
								<img v-if="liked" src="../assets/thumbs-up-solid.svg" alt="SVG Image">
								<img v-else src="../assets/thumbs-up-solid-gray.svg" alt="SVG Image">
								&nbsp;
								{{ likeCnt }}
							</el-button>
						</el-col>
						<el-col :span="3">
							<el-button type="primary" size="small" @click="addComment">{{ t('reviewBlock.reply')
							}}</el-button>
						</el-col>
					</el-row>
					<p></p>
					<el-row>
						<el-col :span="23" :offset="1">
							<el-collapse v-model="activeNames">
								<el-collapse-item :title="t('reviewBlock.title')" name="1" @click="fetchComments">
									<CommentBlock v-for="(comment, index) in comments" :key="index" :ref="(el) => { reviewRefs[comment.id] = el }"
										:commentData="comment" />
								</el-collapse-item>
							</el-collapse>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<!-- 评论表单弹窗 -->
		<el-dialog v-model="replyFormVisible" :title="t('reviewBlock.reply')" width="40%" :before-close="handleClose">
			<span>
				<el-form label-width="20%">
					<el-form-item :label="t('reviewBlock.reply')">
						<el-input v-model="replyPost.content" type="textarea" :rows="10"
							:placeholder="t('reviewBlock.textarea')"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="replyFormVisible = false">{{ t('reviewBlock.cancel') }}</el-button>
					<el-button type="primary" @click="submitReply">{{ t('reviewBlock.confirm') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
  
<script setup lang="ts">
import { ReviewExtended, Comment } from '@/types/course.ts';
import { post } from '@/api';
import { useI18n } from 'vue-i18n';
import CommentBlock from './commentBlock.vue';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';
// 权限控制
const permission = [UserRole.User, UserRole.Administrator];
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

const { t } = useI18n();

interface commentPost {
	reviewId: number;
}

interface commentResponse {
	comments: Comment[];
}

// 定义组件接受的属性
const props = defineProps<{
	reviewData: ReviewExtended;
}>();

const activeNames = reactive<string[]>([]);
const reviewRefs = reactive<{ [key: number]: any }>({});

const review = ref<ReviewExtended>();
const reviewRef = ref();
const comments = reactive<Comment[]>([]);
const commentPost = reactive<commentPost>({
	reviewId: 0,
});
const srcollTo = async (id?: number) => {
	if (!id) {
		reviewRef.value?.scrollIntoView({ behavior: 'smooth' });
	} else {
		await fetchComments();
		const commentRef = reviewRefs[id];
		if (commentRef) {
			if (!activeNames.includes("1")) activeNames.push("1");
			commentRef.value?.scrollIntoView({ behavior: 'smooth' });
		}
	}
	
}
defineExpose({
	srcollTo,
})
const liked = ref(false);
const likeCnt = ref(0);

onMounted(async () => {
	review.value = props.reviewData;
	commentPost.reviewId = review.value.id;
	liked.value = review.value.liked;
	likeCnt.value = review.value.count;
	replyPost.id = review.value.id;
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
	content: string;
}

interface ReplyResponse {
	ret: number;
}

const replyFormVisible = ref(false);
const replyPost = reactive<ReplyPost>({
	id: 0,
	content: '',
});

// 显示评论表单
async function addComment() {
	if (!permission.includes(userInfo.role)) {
		themeConfig.showLoginPanel = true;
		return;
	}
	else replyFormVisible.value = true;
}

// 关闭评论表单
const handleClose = (done: () => void) => {
	// 提醒是否确认
	ElMessageBox.confirm(t('reviewBlock.confirmClose'))
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
			message: t('reviewBlock.emptyContent'),
			type: 'error',
		});
		return;
	}

	// 向后端发送评论的请求
	const response = await post<ReplyResponse>('/api/reply', replyPost);

	// 根据后端返回的数据，弹出不同的提示
	if (response.data.ret == 1) {
		ElMessage({
			message: t('reviewBlock.replySuccess'),
			type: 'success',
		});
		// 清空commments
		comments.splice(0, comments.length);
		const response = await post<commentResponse>('/api/comments', commentPost);
		comments.push(...response.data.comments);
		replyFormVisible.value = false;
	} else {
		ElMessage({
			message: t('reviewBlock.replyFail'),
			type: 'error',
		});
	}
}

async function toggleLike() {
	if (!permission.includes(userInfo.role)) {
		themeConfig.showLoginPanel = true;
		return;
	}
	await post('/api/like', { "id": review.value?.id }).then((res) => {
		console.log(res.data);
		if ((res.data as any).success == true) {
			liked.value = !liked.value;
			if (liked.value) {
				likeCnt.value++;
			} else {
				likeCnt.value--;
			}
			ElMessage({
				message: t('reviewBlock.success'),
				type: 'success',
			});
		} else {
			ElMessage({
				message: t('reviewBlock.fail'),
				type: 'error',
			});
		}
	});
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