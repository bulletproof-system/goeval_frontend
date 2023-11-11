<template>
	<el-scrollbar 
		class="home" wrap-style="width: 100%" view-style="width: 100%" 
		@scroll="scroll" ref="scrollbarRef"
		>
		<div ref="innerRef">
			<div style="height: 30vh"></div>
			<el-affix class="search-container" :offset="60">
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
			<div style="display: flex;">
				<CourseList id="search result" class="course-list" v-if="courseSet.search.length != 0" :list="courseSet.search"/>
				<CourseList id="recommend list" :list="courseSet.recommend" />
			</div>
		</div>
		
	</el-scrollbar>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue'
import CourseList from '@components/courseList.vue'
import { useCourseSet } from '@/stores/course';
import { ElScrollbar } from 'element-plus'

const { t } = useI18n();
const search = ref('');
const courseSet = useCourseSet();
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const max = ref(0)

onMounted(() => {
	console.log(innerRef.value!.clientHeight);
	max.value = innerRef.value!.clientHeight;
	if (courseSet.recommend.length == 0)
		courseSet.moreRecommend(500);
});

const scroll = ({ scrollTop } : { scrollTop: number }) => {
	if (max.value - scrollTop <= 600)
		courseSet.moreRecommend(500);
	console.log(scrollTop, max.value);
	max.value = innerRef.value!.clientHeight;
}

</script>

<style lang="scss" scoped>
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
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.center-element {
	align-items: center;
	justify-content: center;
}

.course-list {
	width: inherit;
	align-items: center;
	justify-content: center;
}
</style>