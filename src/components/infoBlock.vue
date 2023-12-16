<template>
	<div class="course-info">
		<el-row>
			<el-col>
				<el-card shadow="always">
					<el-row class="course-name">
						<el-col :span="24">
							<h1>{{ courseInfo.name }}</h1>
							<el-tag v-for="(item) in courseInfo.tag" effect="dark" round style="margin-right: 3px;"> {{ item
							}} </el-tag>
						</el-col>
						<el-divider />
					</el-row>
					<el-row>
						<el-col class="left" :span="4" :offset="2">
							<p><strong>{{ t('infoBlock.school') }}</strong></p>
							<p>{{ courseInfo.school }}</p>
							<p><strong>{{ t('infoBlock.teacher') }}</strong></p>
							<p>{{ courseInfo.teacher.join(', ') }}</p>
							<p><strong>{{ t('infoBlock.star') }}</strong></p>
							<p><el-rate v-model="courseStar" disabled allow-half show-score></el-rate></p>
						</el-col>
						<el-col class="right" :span="16">
							<p class="center-flex"><strong>{{ t('infoBlock.description') }}</strong></p>
							<p style="white-space: pre-wrap;word-break: break-all;">{{ courseInfo.description }}</p>
						</el-col>
					</el-row>
					<el-row class="bottom" :span="2">
						<el-col :span="6" :offset="6" class="center-flex">
							<el-button v-if="!collected" type="warning" size="large" primary @click="collectCourse">{{ t('infoBlock.starCourse') }}</el-button>
							<el-button v-else type="info" size="large" primary @click="collectCourse">{{ t('infoBlock.cancelStar') }}</el-button>
						</el-col>
						<el-col :span="6" class="center-flex">
							<el-button type="primary" size="large" primary @click="showReviewForm">{{ t('infoBlock.submitReview') }}</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<!-- 评价表单弹窗 -->
		<el-dialog v-model="reviewFormVisible" :title="t('infoBlock.submitReview')" width="40%" :before-close="handleClose">
			<span>
				<el-form label-width="20%">
					<!-- 评价星级 -->
					<el-form-item :label="t('infoBlock.star')">
						<el-rate allow-half show-score v-model="reviewPost.rating"></el-rate>
					</el-form-item>
					<el-form-item :label="t('infoBlock.content')">
						<el-input v-model="reviewPost.content" type="textarea" :rows="10" :placeholder="t('infoBlock.textarea')"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="reviewFormVisible = false">{{ t('infoBlock.cancel') }}</el-button>
					<el-button type="primary" @click="submitReview">{{ t('infoBlock.confirm') }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { CourseInfo } from '@/types/course.ts'
import { post } from '@/api';
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';
// 权限控制
const permission = [UserRole.User, UserRole.Administrator];
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

const { t } = useI18n();

interface CollectResponse {
	ret: number;
}

interface CollectPost {
	id: number;
}

interface ReviewPost {
	id: number;
	rating: number;
	content: string;
}

const collectPost = reactive<CollectPost>({
	id: 0,
})

const reviewPost = reactive<ReviewPost>({
	id: 0,
	rating: 0,
	content: '',
})

onMounted(async () => {
	// collectPost.id = courseInfo.value.id;
	// reviewPost.id = courseInfo.value.id;
})

// 定义组件接受的属性
const props =  defineProps<{
	courseInfo: CourseInfo;
	courseStar: number;
	collected: boolean;
}>();
const emit = defineEmits(['update:collected', 'reload']);

// 使用传递的课程数据作为组件内部的课程数据
// const courseInfo = ref<CourseInfo>(props._courseInfo);
const courseStar = ref<number>(props.courseStar);
// const collected = ref<boolean>(props._collected);
watch(() => props.courseStar, (val) => courseStar.value = val);
const reviewFormVisible = ref(false);
const responseStatus = ref(false);

// 处理收藏课程
const collectCourse = async () => {
	if (!permission.includes(userInfo.role)) {
		themeConfig.showLoginPanel = true;
		return;
	}
	collectPost.id = props.courseInfo.id;
	console.log('collectPost: ', collectPost);

	// 向后端发送收藏课程的请求
	const response = await post<CollectResponse>('/api/collect', collectPost);

	// 根据后端返回的数据，弹出不同的提示
	if (response.data.ret == 1) {
		emit('update:collected', true);
		ElMessage({
			message: t('infoBlock.starSuccess'),
			type: 'success',
		});
	} else {
		emit('update:collected', false);
		ElMessage({
			message: t('infoBlock.starCancel'),
			type: 'warning',
		});
	}
};


// 显示评价表单
const showReviewForm = () => {
	if (!permission.includes(userInfo.role)) {
		themeConfig.showLoginPanel = true;
		return;
	}
	reviewFormVisible.value = true;
	responseStatus.value = false;
};

// 关闭评价表单
const handleClose = (done: () => void) => {
	// 提醒是否确认
	if (responseStatus.value == false)
		ElMessageBox.confirm(t('infoBlock.confirmClose'))
			.then(() => {
				done()
			})
			.catch(() => {
				// catch error
			})
}

// 提交评价
const submitReview = async () => {
	reviewPost.id = props.courseInfo.id;
	console.log('reviewPost: ', reviewPost);

	// 前端检查内容是否为空
	if (reviewPost.content == '') {
		ElMessage({
			message: t('infoBlock.emptyContent'),
			type: 'error',
		});
		return;
	}
	if (reviewPost.rating == 0) {
		ElMessage({
			message: t('infoBlock.emptyStar'),
			type: 'error',
		});
		return;
	}

	// 向后端发送评价的请求
	const response = await post<CollectResponse>('/api/review', reviewPost);

	// 根据后端返回的数据，弹出不同的提示
	if (response.data.ret == 1) {
		ElMessage({
			message: t('infoBlock.reviewSuccess'),
			type: 'success',
		});
		reviewFormVisible.value = false;
		responseStatus.value = true;
		// 刷新页面
		emit('reload');
		// location.reload();
	} else {
		ElMessage({
			message: t('infoBlock.reviewFail'),
			type: 'error',
		});
	}
};


</script>
  
<style scoped>
.el-row {
	margin-top: 20px;
	margin-bottom: 20px;
}

.course-name {
	text-align: center;
}

.left {
	padding: 15px;
}

.right {
	padding: 15px;
}

.bottom {
	padding: 15px;
}

.center-flex {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>