<template>
	<el-container class="panel">
		<el-main class="no-padding">
			<el-table :data="teacherlist" v-loading="loading" size="small" table-layout="auto" height="100%">
				<el-table-column :label="t('manage.teacher.tid')">
					<el-table-column prop="tid">
						<template #header>
							<el-input v-model="request.tid" size="small" :suffix-icon="Search"
									@keyup.enter="getTeacherList" />
						</template>
						<template #default="scope">
							<div v-if="scope.row.tid != 0">
								{{ scope.row.tid }}
							</div>
							<div v-else> </div>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column :label="t('manage.teacher.name')">
					<el-table-column prop="name">
						<template #header>
							<el-input v-model="request.name" size="small" :suffix-icon="Search"
									@keyup.enter="getTeacherList" />
						</template>
						<template #default="scope">
							<div v-if="scope.row.tid != 0">
								<div v-if="edit != scope.row.tid">
									{{ scope.row.name }}
								</div>
								<div v-else>
									<el-input v-model="form.name" size="small" />
								</div>
							</div>
							<div v-else>
								<el-input v-model="newForm.name" size="small" />
							</div>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column prop="operate" width="260px" :label="t('manage.teacher.operate.title')" fixed="right" >
					<template #default="scope">
						<el-button-group v-if="scope.row.tid != 0">
							<el-popconfirm :width="200" :title="t('manage.teacher.operate.delete.confirm')"
								:cancel-button-text="t('manage.cancel')"
								:confirm-button-text="t('manage.confirm')"
								@confirm="handleDelete(scope.row.tid)">
								<template #reference>
									<el-button type="danger" size="small">
										{{ t('manage.announcement.operate.delete.label') }}
									</el-button>
								</template>
							</el-popconfirm>
							<el-button type="warning" size="small" v-if="edit != scope.row.tid" @click="handleEdit(scope.row)">
								{{ t('manage.announcement.operate.edit.label') }}
							</el-button>
							<el-button type="info" size="small" v-if="edit == scope.row.tid" @click="edit=-1">
								{{ t('manage.cancel') }}
							</el-button>
							<el-button type="warning" size="small" v-if="edit == scope.row.tid" @click="handleEditConfim">
								{{ t('manage.confirm') }}
							</el-button>
						</el-button-group>
						<el-button-group v-else>
							<el-button type="primary" size="small" @click="handleAdd">
								{{ t('manage.announcement.operate.add.label') }}
							</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer class="no-padding" style="margin-top: 10px;">
			<div style="display: flex;">
				<el-button type="primary" @click="getTeacherList"> {{ t('manage.reload') }}  </el-button>
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
		</el-footer>
	</el-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue';
import { throttle } from 'lodash';
import { post } from '@/api/index';

interface Teacher {
	tid: number;
	name: string;
}
interface QueryForm {
	page: number;
	page_size: number;
	tid?: number;
	name?: string;
}
interface QueryResponse {
	all: number;
	total: number;
	page_total: number;
	page: number;
	teacherlist: Teacher[];
}

const { t } = useI18n();
const loading = ref(false);
const teacherlist = reactive<Teacher[]>([])
const jump = ref(1);
const pagination = reactive({
	all: 0,
	total: 0,
	page_total: 1,
	page: 1,
	page_size: 10
});
const request = reactive<QueryForm>({
	page: pagination.page,
	page_size: pagination.page_size,
	tid: undefined,
	name: undefined,
});
const getTeacherList = throttle(() => {
	loading.value = true;
	request.page = pagination.page;
	request.page_size = pagination.page_size;
	post<QueryResponse>('/api/manage/teacher/list', request).then(res => {
		const data = res.data;
		data.teacherlist.push({
			tid: 0,
			name: '',
		})
		teacherlist.splice(0, teacherlist.length, ...data.teacherlist)
		pagination.all = data.all;
		pagination.total = data.total;
		pagination.page_total = data.page_total;
		pagination.page = data.page;
		loading.value = false;
		jump.value = pagination.page;
	})
});
const handleCurrentChange = (page: number) => {
	pagination.page = page;
	getTeacherList();
}
const handleJump = (force: boolean) => {
	if (pagination.page != jump.value || force) {
		pagination.page = jump.value;
		getTeacherList();
	}
}

interface DeleteForm {
	tid: number;
}
interface Response {
	success: boolean;
	reason?: string;
}
const handleDelete = throttle((id: number) => {
	const request: DeleteForm = { tid: id }
	post<Response>('/api/manage/teacher/delete', request).then(res => {
		const response = res.data;
		getTeacherList();
		if (response.success) {
			ElMessage.success(t('manage.teacher.operate.delete.success'));
		} else ElMessage.error(t('manage.invaild'));
	});
}, 500);

const edit = ref(-1);
const form = reactive({
	tid: -1,
	name: '',
})
const handleEdit = throttle((info: Teacher) => {
	edit.value = info.tid;
	form.tid = info.tid;
	form.name = info.name;
}, 500);
const handleEditConfim = throttle(() => {
	post<Response>('/api/manage/teacher/edit', form).then(res => {
		const response = res.data;
		if (response.success) {
			ElMessage.success(t('manage.teacher.operate.edit.success'));
			getTeacherList();
		} else ElMessage.error(t('manage.invaild'));
	});
	edit.value = -1;
}, 500);

const newForm = reactive({
	name: '',
})
const handleAdd = throttle(() => {
	post<Response>('/api/manage/teacher/add', newForm).then(res => {
		const response = res.data;
		if (response.success) {
			ElMessage.success(t('manage.teacher.operate.add.success'));
			newForm.name = '';
			getTeacherList();
		} else ElMessage.error(t('manage.invaild'));
	});
}, 5000);

onMounted(() => {
	getTeacherList();
});
onUnmounted(() => {
	teacherlist.splice(0, teacherlist.length);
})
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

.no-padding {
  padding: 0px;
}
</style>