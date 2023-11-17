<template>
	<el-scrollbar 
		class="home" wrap-style="width: 100%" view-style="width: 100%" 
		@scroll="scroll" ref="scrollbarRef"
		>
		<div ref="innerRef">
			<div style="height: 30vh"></div>
			<el-affix class="search-container" :offset="60">
				<el-autocomplete
					v-model="keyword"
					:fetch-suggestions="querySearchAsync"
					:placeholder="t('search.placeholder')"
					:prefix-icon="Search"
					@select="handleSearch"
					@keyup.enter="handleSearch"
					style="width: 50vw;"
					clearable
				>
				<template #default="{ item }">
					<div style="display: flex; align-items: center;"> 
						<span>{{ item.value }}</span> 
						<div style="flex-grow: 1;"></div>
						<Tag :type="item.type" />
					</div> 
				</template>
				</el-autocomplete>
			</el-affix>
			<div style="height: 30vh" v-if="courseSet.search.length == 0"></div>
			<div style="display: flex;">
				<CourseList id="search result" class="course-list" v-if="courseSet.search.length != 0" :list="courseSet.search"/>
			</div>
			<el-divider>
				{{ t('home.recommend') }}
			</el-divider>
			<div style="display: flex;">
				<CourseList id="recommend list" :list="courseSet.recommend" />
			</div>
		</div>
		
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
const courseSet = useCourseSet();
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const max = ref(0)
const moreRecommend = throttle(courseSet.moreRecommend, 1000);
const searchCourse = throttle(courseSet.searchCourse, 1000);

onMounted(() => {
	console.log(innerRef.value!.clientHeight, scrollbarRef.value!.wrapRef?.clientHeight);
	max.value = innerRef.value!.clientHeight;
	if (courseSet.recommend.length == 0)
		moreRecommend(500);
});

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  	post<CompleteResult[]>('/api/autocomplete', queryString).then((results) => {
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