<template>
	<el-scrollbar>
		<el-empty v-if="courseSet.star.length == 0" :description="t('home.empty')" />
		<div style="display: flex; justify-content: center;">
			<CourseList :list="courseSet.star" />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';
import CourseList from './courseList.vue';
import { useCourseSet } from '@/stores/course';
import { useI18n } from 'vue-i18n';
import throttle from 'lodash/throttle';

const permission = [UserRole.User, UserRole.Administrator];
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();
const courseSet = useCourseSet();
const { t } = useI18n();
const getStarList = throttle(courseSet.getStarList);

onMounted(() => {
	if (!permission.includes(userInfo.role)) themeConfig.showLoginPanel = true;
	getStarList(100);
})
onUnmounted(() => {
	courseSet.clearStar();
})

watch(userInfo, (_, newVal) => {
	if (permission.includes(newVal.role)) getStarList(100);
})

</script>

<style scoped>

</style>