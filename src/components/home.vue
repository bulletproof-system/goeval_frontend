<template>
	<el-scrollbar 
		class="home" wrap-style="width: 100%" view-style="width: 100%" 
		@scroll="scroll" ref="scrollbarRef"
		>
		<div ref="innerRef">
			<div ref="updivRef" style="height: 30vh"></div>
			<el-affix class="search-container" :offset="60">
				<el-autocomplete
				v-model="keyword"
				:fetch-suggestions="querySearchAsync"
				:placeholder="t('search.placeholder')"
				:prefix-icon="Search"
				@select="handleSearch"
				@keyup.enter="handleSearch"
				style="width: 50vw;"
				clearable>
					<template #default="{ item }">
						<div style="display: flex; align-items: center;"> 
							<span>{{ item.value }}</span> 
							<div style="flex-grow: 1;"></div>
							<Tag :type="item.type" />
						</div> 
					</template>
				</el-autocomplete>
			</el-affix>
			
			<div v-loading="loading">
				<el-empty v-if="showEmpty" :description="t('home.empty')" />
				<div style="height: 30vh" v-else-if="courseSet.search.length == 0">
				</div>
				<div style="display: flex; justify-content: center;">
					<CourseList id="search result" class="course-list" v-if="courseSet.search.length != 0" :list="courseSet.search"/>
				</div>
			</div>
			
			<el-divider>
				{{ t('home.recommend') }}
			</el-divider>
			<div style="display: flex; justify-content: center;">
				<CourseList id="recommend list" class="course-list" :list="courseSet.recommend" />
			</div>
		</div>
		<el-backtop :right="50" :bottom="50" :visibility-height="0" @click="scrollToTop"/>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue'
import CourseList from '@components/courseList.vue'
import Tag from '@components/tag.vue'
import { useCourseSet } from '@/stores/course';
import { ElScrollbar } from 'element-plus'
import throttle from 'lodash/throttle';
import { post } from '@/api';
import { CompleteResult } from '@/types/course';

const { t } = useI18n();
const keyword = ref('');
const loading = ref(false)
const courseSet = useCourseSet();
const innerRef = ref<HTMLDivElement>()
const updivRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const max = ref(0)
const moreRecommend = throttle(courseSet.moreRecommend, 3000);
const searchCourse = throttle((key: string) => {
	showEmpty.value = false;
	loading.value = true;
	courseSet.searchCourse(key).then(() => {
		if (courseSet.search.length == 0) showEmpty.value = true;
	}).finally(() => { loading.value = false; });
	scrollToTop();
}, 1000);
const scrollToTop = () => {
	scrollbarRef.value?.scrollTo({
		top: updivRef.value!.clientHeight - 10,
		behavior: 'smooth'
	});
}
const showEmpty = ref(false);

onMounted(() => {
	console.log(innerRef.value!.clientHeight, scrollbarRef.value!.wrapRef?.clientHeight);
	max.value = innerRef.value!.clientHeight;
	if (courseSet.recommend.length == 0)
		moreRecommend(500);
});

onUnmounted(() => {
	courseSet.clearSearch();
	courseSet.clearRecommend();
})

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  	post<CompleteResult[]>('/api/autocomplete', {"key" : queryString}).then((results) => {
		cb(results.data);
	});
}

const handleSearch = () => {
	searchCourse(keyword.value);
}

const scroll = ({ scrollTop } : { scrollTop: number }) => {
	max.value = innerRef.value!.clientHeight;
	if (max.value - scrollTop - scrollbarRef.value!.wrapRef?.clientHeight! <= 10)
		moreRecommend(500);
	console.log(scrollTop, max.value, scrollbarRef.value!.wrapRef?.clientHeight);
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

:deep(.el-input__wrapper) {
	background-color: var(--bg-topBar-color);
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