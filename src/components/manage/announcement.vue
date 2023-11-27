<template>
	<div class="panel">
		<el-table :data="announcementlist" v-loading="loading" size="small" table-layout="auto">
			<el-table-column :label="t('manage.announcement.aid')">
				<el-table-column prop="aid">
					<template #header>
						<el-input v-model="request.aid" size="small" :suffix-icon="Search"
								@keyup.enter="getAnnouncementList" />
					</template>
					<template #default="scope">
						<div v-if="scope.row.aid != 0">
							{{ scope.row.aid }}
						</div>
						<div v-else> </div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.announcement.title_')">
				<el-table-column prop="title">
					<template #header>
						<el-input v-model="request.title" size="small" :suffix-icon="Search"
								@keyup.enter="getAnnouncementList" />
					</template>
					<template #default="scope">
						<div v-if="scope.row.aid != 0">
							<div v-if="edit != scope.row.aid">
								{{ scope.row.title }}
							</div>
							<div v-else>
								<el-input v-model="form.title" size="small" />
							</div>
						</div>
						<div v-else>
							<el-input v-model="newForm.title" size="small" />
						</div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.announcement.content')">
				<el-table-column prop="content">
					<template #header>
						<el-input v-model="request.content" size="small" :suffix-icon="Search"
								@keyup.enter="getAnnouncementList" />
					</template>
					<template #default="scope">
						<div v-if="scope.row.aid != 0">
							<div v-if="edit != scope.row.aid">
								{{ scope.row.content }}
							</div>
							<div v-else>
								<el-input v-model="form.content" size="small" type="textarea" autosize/>
							</div>
						</div>
						<div v-else>
							<el-input v-model="newForm.content" size="small" type="textarea" autosize/>
						</div>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.announcement.datetime')" prop="datetime">
				<template #default="scope">
					<div v-if="scope.row.aid != 0"> {{ scope.row.datetime }} </div>
					<div v-else></div>
				</template>
			</el-table-column>
			<el-table-column prop="operate" width="400px" :label="t('manage.announcement.operate.title')" fixed="right" >
				<template #default="scope">
					<el-button-group v-if="scope.row.aid != 0">
						<el-popconfirm :width="200" :title="t('manage.announcement.operate.delete.confirm')"
							:cancel-button-text="t('manage.cancel')"
							:confirm-button-text="t('manage.confirm')"
							@confirm="handleDelete(scope.row.id)">
							<template #reference>
								<el-button type="danger" size="small">
									{{ t('manage.announcement.operate.delete.label') }}
								</el-button>
							</template>
						</el-popconfirm>
						<el-button type="warning" size="small" v-if="edit != scope.row.aid" @click="handleEdit(scope.row)">
							{{ t('manage.announcement.operate.edit.label') }}
						</el-button>
						<el-button type="info" size="small" v-if="edit == scope.row.aid" @click="edit=-1">
							{{ t('manage.cancel') }}
						</el-button>
						<el-button type="warning" size="small" v-if="edit == scope.row.aid" @click="handleEditConfim">
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
		<el-divider />
		<div style="display: flex;">
			<el-button type="primary" @click="getAnnouncementList"> {{ t('manage.reload') }}  </el-button>
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
import { Search } from '@element-plus/icons-vue';
import { throttle } from 'lodash';
import { post } from '@/api/index';
import { Announcement } from '@/types/user';

interface QueryForm {
	page: number;
	page_size: number;
	aid?: number;
	title?: string;
	content?: string;
}
interface QueryResponse {
	all: number;
	total: number;
	page_total: number;
	page: number;
	announcementlist: Announcement[];
}

const { t } = useI18n();
const loading = ref(false);
const announcementlist = reactive<Announcement[]>([])
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
	aid: undefined,
	title: undefined,
	content: undefined,
});
const getAnnouncementList = throttle(() => {
	loading.value = true;
	request.page = pagination.page;
	request.page_size = pagination.page_size;
	post<QueryResponse>('api/manage/announcement/list', request).then(res => {
		const data = res.data;
		data.announcementlist.push({
			aid: 0,
			title: '',
			content: '',
			datetime: new Date()
		})
		announcementlist.splice(0, data.announcementlist.length, ...data.announcementlist);
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
	getAnnouncementList();
}
const handleJump = (force: boolean) => {
	if (pagination.page != jump.value || force) {
		pagination.page = jump.value;
		getAnnouncementList();
	}
}

interface DeleteForm {
	aid: number;
}
interface Response {
	success: boolean;
	reason?: string;
}
const handleDelete = throttle((id: number) => {
	const request: DeleteForm = { aid: id }
	post<Response>('/api/manage/announcement/delete', request).then(res => {
		const response = res.data;
		getAnnouncementList();
		if (response.success) {
			ElMessage.success(t('manage.announcement.operate.delete.success'));
		} else ElMessage.error(t('manage.invaild'));
	});
}, 500);

const edit = ref(-1);
const form = reactive({
	aid: -1,
	title: '',
	content: '',
})
const handleEdit = throttle((info: Announcement) => {
	edit.value = info.aid;
	form.aid = info.aid;
	form.title = info.title;
	form.content = info.content;
}, 500);
const handleEditConfim = throttle(() => {
	post<Response>('/api/manage/announcement/edit', form).then(res => {
		const response = res.data;
		if (response.success) {
			ElMessage.success(t('manage.announcement.operate.edit.success'));
			getAnnouncementList();
		} else ElMessage.error(t('manage.invaild'));
	});
	edit.value = -1;
}, 500);

const newForm = reactive({
	title: '',
	content: '',
})
const handleAdd = throttle(() => {
	post<Response>('/api/manage/announcement/add', newForm).then(res => {
		const response = res.data;
		if (response.success) {
			ElMessage.success(t('manage.announcement.operate.add.success'));
			newForm.title = '';
			newForm.content = '';
			getAnnouncementList();
		} else ElMessage.error(t('manage.invaild'));
	});
}, 5000);

onMounted(() => {
	getAnnouncementList();
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