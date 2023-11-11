<template>
	<el-scrollbar class="home">
		<div style="height: 30vh"></div>
		<el-affix class="search-container" :offset="5">
				<el-autocomplete
					v-model="search"
					:placeholder="t('search.placeholder')"
					:prefix-icon="Search"
					style="width: 50vw;"
					clearable
				>
				</el-autocomplete>
		</el-affix>
		<div style="height: 30vh"></div>
		<el-affix class="search-container" :offset="30">
			<CourseList id="search result" v-if="courseSet.search.length != 0" :list="courseSet.search"/>
			<CourseList id="recommend list" :list="courseSet.recommend" @more="courseSet.moreRecommend" />
		</el-affix>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue'
import CourseList from '@components/courseList.vue'
import { useCourseSet } from '@/stores/course';

const { t } = useI18n();
const search = ref('');
const courseSet = useCourseSet();

onMounted(() => {
	if (courseSet.recommend.length == 0)
		courseSet.moreRecommend();
});

</script>

<style scoped>
.home {
	display: flex;
	padding-left: 20px;
	padding-right: 20px;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: inherit;
}

.search-container {
	justify-content: center;
	align-items: center;
}

.center-element {
align-items: center;
justify-content: center;
}

.course-list {

}
</style>