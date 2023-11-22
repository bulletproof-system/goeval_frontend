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
							<el-button type="warning" primary>收藏课程</el-button></el-col>
						<el-col :span="6" class="center-flex"><el-button type="primary" primary>提交评价</el-button></el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
  
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'
import { CourseInfo } from '@/types'

const { t } = useI18n();
const courseInfo = ref<CourseInfo>({
	id: '1',
	name: '数据库系统原理',
	school: '北京航空航天大学',
	teacher: ['张三', '李四'],
});

const courseStar = ref(3.2);
const courseIntro = ref('在操作系统出现之后，随着计算机应用范围的扩大、需要处理的数据迅速膨胀。最初，数据与程序一样，以简单的文件作为主要存储形式。以这种方式组织的数据在逻辑上更简单，但可扩展性差，访问这种数据的程序需要了解数据的具体组织格式。当系统数据量大或者用户访问量大时，应用程序还需要解决数据的完整性、一致性以及安全性等一系列的问题。因此，必须开发出一种系统软件，它应该能够像操作系统屏蔽了硬件访问复杂性那样，屏蔽数据访问的复杂性。由此产生了数据管理系统，即数据库。');

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