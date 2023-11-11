<template>
	<el-card class="box-card" shadow="hover">
		<template #header>
			<div class="card-header">
				<span>{{ info.name }}</span>
			</div>
		</template>
		<el-descriptions :column="2">
			<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon><User /></el-icon>
						{{ t('course.school') }}
						</div>
					</template>
					{{ info.school }} 
			</el-descriptions-item>
			<el-descriptions-item>
					<template #label>
						<div class="cell-item">
							<el-icon><User /></el-icon>
						{{ t('course.teacher') }}
						</div>
					</template>
					{{ info.teacher.join(',') }} 
			</el-descriptions-item>
		</el-descriptions>
	</el-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { CourseInfo } from '@/types/course';
import type { PropType } from "vue"

const props = defineProps({
	info: { type: Object as PropType<CourseInfo>, required: true },
});

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
</style>