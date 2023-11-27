<template>
	<el-card class="box-card" shadow="hover" @click="handleClick">
		<template #header>
			<div class="card-header">
				<span>{{ info.name }}</span>
			</div>
		</template>
		<el-descriptions :column="1">
			<el-descriptions-item>
				<template #label>
					<div class="cell-item">
						<el-icon><School /></el-icon>
					{{ t('course.school') }}
					</div>
				</template>
				<div class="singe-line">{{ info.school }}</div>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<div class="cell-item">
						<el-icon><User /></el-icon>
					{{ t('course.teacher') }}
					</div>
				</template>
				<div class="singe-line">{{ info.teacher.join(',') }} </div>
			</el-descriptions-item>
		</el-descriptions>
	</el-card>
</template>

<script setup lang="ts">
import { User, School } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { CourseInfo } from '@/types/course';
import { router } from '@/router';
import type { PropType } from "vue"

// @ts-ignore
const props = defineProps({
	info: { type: Object as PropType<CourseInfo>, required: true },
});

const handleClick = () => {
	router.push({
		name: 'course',
		params: { course_id: props.info.id.toString() },
	});
};

</script>

<style lang="scss" scoped>
.box-card {
  width: 480px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cell-item {
  display: flex;
  align-items: center;
}

.singe-line {
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
	white-space: nowrap;
}
</style>