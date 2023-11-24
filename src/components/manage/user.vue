<template>
	<div class="panel">
		<el-table :data="userlist" v-loading="loading" class="table"
			size="small"
			>
			<el-table-column prop="uid" :label="t('manage.user.uid')" />
			<el-table-column prop="username" :label="t('manage.user.username')" />
			<el-table-column prop="email" :label="t('manage.user.email')" />
			<el-table-column prop="role" :label="t('manage.user.role.label')" />
			<el-table-column prop="last_login" :label="t('manage.user.last_login')" />
			<el-table-column prop="operate" :label="t('manage.user.operate.title')" fixed="right" />
		</el-table>
		<el-button @click="getUserList"> {{ t('manage.user.operate.reload') }}  </el-button>
		<el-pagination 
			:current-page="pagination.page"
			:page-size="pagination.page_size"
			:page-count="pagination.page_total"
			:total="pagination.total"
			background
			layout="->, slot, prev, pager, next, jumper"
			@current-change="handleCurrentChange"
		>
			<template #default>  </template>
		</el-pagination>
	</div>
	
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { UserDetail, UserRole } from '@/types/user';
import { post } from '@/api/index'
import throttle from 'lodash/throttle';

interface QueryForm {
	page: number;
	page_size: number;
	uid?: number;
	username?: string;
	email?: string;
	role?: UserRole;
}
interface QueryResponse {
	all: number;
	total: number;
	page_total: number;
	page: number;
	userlist: UserDetail[];
}

const { t } = useI18n();
const userlist = reactive<UserDetail[]>([]);
const loading = ref(false);
const pagination = reactive({
	total: 0,
	page_total: 0,
	page: 1,
	page_size: 10
})
const request = reactive<QueryForm>({
	page: pagination.page,
	page_size: pagination.page_total,
	uid: undefined,
	username: undefined,
	email: undefined,
	role: undefined,
})
const getUserList = throttle(() => {
	loading.value = true;
	request.page = pagination.page;
	request.page_size = pagination.page_size;
	post<QueryResponse>('/api/manage/userlist', request).then(res => {
		const data = res.data;
		userlist.splice(0, data.userlist.length, ...data.userlist);
		pagination.total = data.total;
		pagination.page_total = data.page_total;
		pagination.page = data.page;
		loading.value = false;
	})
}, 3000);
const handleCurrentChange = (page: number) => {
	pagination.page = page;
	getUserList();
}

onMounted(() => {
	getUserList();
});

</script>

<style scoped>
.panel {
	height: 100%;
}
.table {
	/* height: 70%; */
}
</style>