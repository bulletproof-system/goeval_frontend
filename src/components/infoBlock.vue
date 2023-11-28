<template>
	<div class="course-info">
		<el-row>
			<el-col>
				<el-card shadow="always">
					<el-row class="course-name">
						<el-col :span="24">
							<h1>{{ courseInfo.name }}</h1>
							<el-tag v-for="(item) in courseInfo.tag" effect="dark" round style="margin-right: 3px;"> {{ item }} </el-tag>
						</el-col>
						<el-divider />
					</el-row>
					<el-row>
						<el-col class="left" :span="4" :offset="2">
							<p><strong>开课学校</strong></p>
							<p>{{ courseInfo.school }}</p>
							<p><strong>任课教师</strong></p>
							<p>{{ courseInfo.teacher.join(', ') }}</p>
							<p><strong>评价星级</strong></p>
							<p><el-rate v-model="courseStar" disabled allow-half show-score></el-rate></p>
						</el-col>
						<el-col class="right" :span="16">
							<p class="center-flex"><strong>课程简介</strong></p>
							<p>{{ courseInfo.description }}</p>
						</el-col>
					</el-row>
					<el-row class="bottom" :span="2">
						<el-col :span="6" :offset="6" class="center-flex">
							<el-button type="warning" size="large" primary @click="collectCourse">收藏课程</el-button>
						</el-col>
						<el-col :span="6" class="center-flex">
							<el-button type="primary" size="large" primary @click="showReviewForm">提交评价</el-button>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<!-- 评价表单弹窗 -->
		<el-dialog v-model="reviewFormVisible" title="提交评价" width="40%" :before-close="handleClose">
			<span>
				<el-form label-width="20%">
					<!-- 评价星级 -->
					<el-form-item label="评分">
						<el-rate allow-half show-score v-model="reviewPost.rating"></el-rate>
					</el-form-item>
					<el-form-item label="内容">
						<el-input v-model="reviewPost.content" type="textarea" :rows="10" placeholder="请输入评价内容"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="reviewFormVisible = false">取消</el-button>
					<el-button type="primary" @click="submitReview">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { CourseInfo } from '@/types/course.ts'
import { post } from '@/api';

interface CollectResponse {
	ret: number;
}

interface CollectPost {
	username: string;
	id: number;
}

interface ReviewPost {
	username: string;
	id: number;
	rating: number;
	content: string;
}

const collectPost = reactive<CollectPost>({
	username: '',
	id: 0,
})

const reviewPost = reactive<ReviewPost>({
	username: '',
	id: 0,
	rating: 0,
	content: '',
})

onMounted(() => {
	// TODO: 如何获取用户名?
	collectPost.username = 'test';
	reviewPost.username = 'test';
	collectPost.id = courseInfo.value.id;
	reviewPost.id = courseInfo.value.id;
})

// 定义组件接受的属性
const props = defineProps<{
	_courseInfo: CourseInfo;
	_courseStar: number;
}>();

// 使用传递的课程数据作为组件内部的课程数据
const courseInfo = ref<CourseInfo>(props._courseInfo);
const courseStar = ref<number>(props._courseStar);

const reviewFormVisible = ref(false);

// 处理收藏课程
const collectCourse = async () => {
	// 向后端发送收藏课程的请求
	const response = await post<CollectResponse>('/api/collect', { collectPost });

	// 根据后端返回的数据，弹出不同的提示
	if (response.data.ret == 1) {
		ElMessage({
			message: '成功收藏',
			type: 'success',
		});
	} else {
		ElMessage({
			message: '取消收藏',
			type: 'warning',
		});
	}
};


// 显示评价表单
const showReviewForm = () => {
	reviewFormVisible.value = true;
};

// 关闭评价表单
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

// 提交评价
const submitReview = async () => {
	// 向后端发送评价的请求
	const response = await post<CollectResponse>('/api/review', { reviewPost });

	// 根据后端返回的数据，弹出不同的提示
	if (response.data.ret == 1) {
		ElMessage({
			message: '评价成功',
			type: 'success',
		});
	} else {
		ElMessage({
			message: '你已经提交过评价了',
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