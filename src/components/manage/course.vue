<template>
	<div class="panel">
		<el-table :data="courselist" v-loading="loading" size="small" table-layout="auto">
			<el-table-column :label="t('manage.course.cid')">
				<el-table-column prop="id">
					<template #header>
						<el-input v-model="request.cid" size="small" :suffix-icon="Search"
							@keyup.enter="getCourseList" />
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.course.name')">
				<el-table-column prop="name">
					<template #header>
						<el-input v-model="request.name" size="small" :suffix-icon="Search"
							@keyup.enter="getCourseList" />
					</template>
					<template #default="scope">
						<div v-if="edit != scope.row.id">
							{{ scope.row.name }}
						</div>
						<div v-else>
							<el-input v-model="form.name" size="small" />
						</div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.course.school')">
				<el-table-column prop="school">
					<template #header>
						<el-input v-model="request.school" size="small" :suffix-icon="Search"
							@keyup.enter="getCourseList" />
					</template>
					<template #default="scope">
						<div v-if="edit != scope.row.id">
							{{ scope.row.school }}
						</div>
						<div v-else>
							<el-input v-model="form.school" size="small" />
						</div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.course.teacher')">
				<el-table-column prop="teacher">
					<template #header>
						<el-input v-model="request.teacher" size="small" :suffix-icon="Search"
							@keyup.enter="getCourseList" />
					</template>
					<template #default="scope">
						<div v-if="edit != scope.row.id">
							<el-tag v-for="(item) in scope.row.teacher" style="margin-right: 5px;"> {{ item }} </el-tag>
						</div>
						<div v-else>
							<el-tag v-for="(item, index) in form.teacher" style="margin-right: 5px; width: 50px;"
							closable @close="form.teacher.splice(index, 1)"> 
								{{ item }} 
							</el-tag>
							<el-input
								v-if="inputTeacher"
								ref="InputRef"
								v-model="inputValue"
								size="small"
								@keyup.enter="handleInputConfirm"
								@blur="handleInputConfirm"
							/>
							<el-button v-else size="small" @click="showInput">
								{{ t('manage.course.operate.edit.new') }}
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop="operate" width="400px" :label="t('manage.course.operate.title')" fixed="right" >
				<template #default="scope">
					<el-button-group>
						<el-popconfirm :width="200" :title="t('manage.course.operate.delete.confirm')"
							:cancel-button-text="t('manage.cancel')"
							:confirm-button-text="t('manage.confirm')"
							@confirm="handleDelete(scope.row.id)">
							<template #reference>
								<el-button type="danger" size="small">
									{{ t('manage.course.operate.delete.label') }}
								</el-button>
							</template>
						</el-popconfirm>
						<el-button type="warning" size="small" v-if="edit != scope.row.id" @click="handleEdit(scope.row)">
							{{ t('manage.course.operate.edit.label') }}
						</el-button>
						<el-button type="info" size="small" v-if="edit == scope.row.id" @click="edit=-1">
							{{ t('manage.cancel') }}
						</el-button>
						<el-button type="warning" size="small" v-if="edit == scope.row.id" @click="handleEditConfim">
							{{ t('manage.confirm') }}
						</el-button>
						<el-button type="primary" size="small" @click="handleDetail(scope.row.id)">
							{{ t('manage.course.operate.detail.label') }}
						</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
		<el-divider />
		<div style="display: flex;">
			<el-button type="primary" @click="getCourseList"> {{ t('manage.reload') }}  </el-button>
			<div style="flex: 1;"></div>
			<div class="pagination">
				<el-text>
					{{ t('manage.pagination.total', [pagination.all, pagination.total]) }}
				</el-text>
				<el-pagination style="margin-left: 5px; margin-right: 5px;"
					:current-page="pagination.page"
					:page-size="pagination.page_size"
					:page-count="pagination.page_total"
					:total="pagination.total"
					background
					layout="prev, pager, next"
					@current-change="handleCurrentChange"/>
				<el-text>{{ t('manage.pagination.jump') }}</el-text>
				<el-input-number style="width: 40px; margin-left: 5px; margin-right: 5px;" 
					:controls="false"
					:min="1" :max="pagination.page_total" v-model="jump"
					:value-on-clear="pagination.page" size="small"
					@blur="handleJump(false)" @keyup.enter="handleJump(true)"/>
				<el-text>{{ t('manage.pagination.page') }}</el-text>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { CourseInfo } from '@/types/course.ts'
import { Search } from '@element-plus/icons-vue';
import { throttle } from 'lodash';
import { post } from '@/api/index';
import { router } from '@/router';
import { ElInput } from 'element-plus'

interface QueryForm {
	page: number;
	page_size: number;
	cid?: number;
	name?: string;
	school?: string;
	teacher?: string;
}
interface QueryResponse {
	all: number;
	total: number;
	page_total: number;
	page: number;
	courselist: CourseInfo[];
}

const { t } = useI18n();
const loading = ref(false);
const courselist = reactive<CourseInfo[]>([]);
const jump = ref(1);
const pagination = reactive({
	all: 0,
	total: 0,
	page_total: 1,
	page: 1,
	page_size: 10
})
const request = reactive<QueryForm>({
	page: pagination.page,
	page_size: pagination.page_size,
	cid: undefined,
	name: undefined,
	school: undefined,
	teacher: undefined
})
const getCourseList = throttle(() => {
	loading.value = true;
	request.page = pagination.page;
	request.page_size = pagination.page_size;
	post<QueryResponse>('api/manage/course/list', request).then(res => {
		const data = res.data;
		courselist.splice(0, data.courselist.length, ...data.courselist);
		pagination.all = data.all;
		pagination.total = data.total;
		pagination.page_total = data.page_total;
		pagination.page = data.page;
		loading.value = false;

		jump.value = pagination.page;
	})
}, 3000);
const handleCurrentChange = (page: number) => {
	pagination.page = page;
	getCourseList();
}
const handleJump = (force: boolean) => {
	if (pagination.page != jump.value || force) {
		pagination.page = jump.value;
		getCourseList();
	}
}

interface DeleteForm {
	cid: number;
};
interface Response {
	success: boolean;
	reason?: string;
};
const handleDelete = throttle((id: number) => {
	const request: DeleteForm = {
		cid: id,
	}
	post<Response>('/api/manage/course/delete', request).then(res => {
		const response = res.data;
		getCourseList();
		if (response.success) {
			ElMessage.success(t('manage.course.operate.delete.success'));
		} else ElMessage.error(t('manage.invaild'));
	});
}, 500);

const edit = ref(-1);
const form = reactive<CourseInfo>({
	id: -1,
	name: '',
	school: '',
	teacher: [],
});
const handleEdit = throttle((info: CourseInfo) => {
	edit.value = info.id;
	form.id = info.id;
	form.name = info.name;
	form.school = info.school;
	form.teacher = info.teacher.slice();
}, 500);
const handleEditConfim = throttle(() => {
	post<Response>('/api/manage/course/edit', form).then(res => {
		const response = res.data;
		if (response.success) {
			ElMessage.success(t('manage.course.operate.edit.success'));
			getCourseList();
		} else ElMessage.error(t('manage.invaild'));
	});
	edit.value = -1;
}, 500);
const inputValue = ref('');
const inputTeacher = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
	const showInput = () => {
	inputTeacher.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    form.teacher.push(inputValue.value)
  }
  inputTeacher.value = false
  inputValue.value = ''
}

const handleDetail = throttle((id: number) => {
	router.push({ name: 'course', params: { course_id: id.toString() }})
}, 500)

onMounted(() => {
	getCourseList();
});
</script>

<style scoped>

.panel {
	height: 100%;
}
.pagination {
	display: flex; 
	flex-direction: row;
	margin-right: 10px;
}
</style>