<template>
	<div class="courseInfo">
		<!-- 课程列表 -->
		<el-table :data="courseList" style="width: 100%">
			<el-table-column prop="courseName" :label="$t('courseInfo.courseName')"></el-table-column>
			<el-table-column prop="instructor" :label="$t('courseInfo.courseInstructor')"></el-table-column>
			<!-- 其他列... -->
			<el-table-column :label="$t('courseInfo.operation')">
				<template #default="{ row }">
					<el-button type="text" @click="showCourseDetail(row.courseName, row.instructor)">
						{{ $t('courseInfo.detail') }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 课程详情 -->
		<el-dialog v-model="dialogVisible" :title="$t('courseInfo.courseDetail')" width="60%">
			<el-form :model="selectedCourse" label-width="20%">
				<el-form-item :label="$t('courseInfo.courseName')">
					<el-input v-model="selectedCourse.courseName" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('courseInfo.courseInstructor')">
					<el-input v-model="selectedCourse.instructor" disabled></el-input>
				</el-form-item>
				<!-- 其他字段... -->
			</el-form>
			<el-divider></el-divider>
			<el-form label-width="20%">
				<el-form-item>
					<review-form :reviewForm="reviewForm"></review-form>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import reviewForm from "./reviewForm.vue";

const courseList = ref([
	{ courseName: "课程1", instructor: "老师1" /* 其他数据... */ },
	{ courseName: "课程2", instructor: "老师2" /* 其他数据... */ },
	// 其他课程...
]);

const dialogVisible = ref(false);

const selectedCourse = ref({
	// 课程详情字段...
	courseName: '',
	instructor: '',
});

const showCourseDetail = (courseName: string, instructor: string) => {
	// 在这里处理显示课程详情的逻辑
	selectedCourse.value.courseName = courseName;
	selectedCourse.value.instructor = instructor;
	dialogVisible.value = true;
};

</script>
