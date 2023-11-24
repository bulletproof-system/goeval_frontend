<template>
	<div class="course-info">
		<el-row>
			<el-col>
				<el-card shadow="always">
					<el-row class="course-name">
						<el-col :span="24">
							<h1>{{ courseInfo.name }}</h1>
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
							<p>{{ courseIntro }}</p>
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
						<el-rate allow-half show-score></el-rate>
					</el-form-item>
					<el-form-item label="内容">
						<el-input v-model="form.content" type="textarea" :rows="10" placeholder="请输入评价内容"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="reviewFormVisible = false">取消</el-button>
					<el-button type="primary" @click="reviewFormVisible = false">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { CourseInfo } from '@/types/pinia'

// 定义组件接受的属性
const props = defineProps<{
	_courseInfo: CourseInfo;
	_courseStar: number;
	_courseIntro: string;
}>();

// 使用传递的课程数据作为组件内部的课程数据
const courseInfo = ref<CourseInfo>(props._courseInfo);
const courseStar = ref<number>(props._courseStar);
const courseIntro = ref<string>(props._courseIntro);

const reviewFormVisible = ref(false);

// 处理收藏课程
const collectCourse = () => {
    ElMessage({
    message: '收藏成功',
    type: 'success',
  })
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

const form = reactive({
  content: '',
})


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