<template>
	<div class="panel">
		<el-table :data="userlist" v-loading="loading" class="table"
			size="small"
			>
			<el-table-column :label="t('manage.user.uid')" >
				<el-table-column prop="uid">
					<template #header>
						<el-input v-model="request.uid" size="small" :suffix-icon="Search" 
							@keyup.enter="getUserList"/>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.user.username')" >
				<el-table-column prop="username">
					<template #header>
						<el-input v-model="request.username" size="small" :suffix-icon="Search"
							@keyup.enter="getUserList"/>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column :label="t('manage.user.email')" >
				<el-table-column prop="email">
					<template #header>
						<el-input v-model="request.email" size="small" :suffix-icon="Search"
							@keyup.enter="getUserList"/>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column width="80px" :label="t('manage.user.role.label')" >
				<el-table-column prop="role">
					<template #header>
						<el-select v-model="request.role" size="small" @change="getUserList">
							<el-option size="small"
								v-for="item in [1, 2]"
								:label="t(`manage.user.role.${item}`)"
								:value="item"
							>
								<el-tag :type="tagType(item)">
									{{ t(`manage.user.role.${item}`) }}
								</el-tag>
							</el-option>
						</el-select>
						
					</template>
					<template #default="scope">
						<el-tag :type="scope.row.role == 1 ? 'info' : 'warning'">
							{{ t(`manage.user.role.${scope.row.role}`) }}
						</el-tag>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop="last_login" :label="t('manage.user.last_login')" />
			<el-table-column prop="operate" width="400px" :label="t('manage.user.operate.title')" fixed="right" >
				<template #default="scope">
					<el-button-group>
						<el-popconfirm :width="200" :title="t('manage.user.operate.delete.confirm')"
							:cancel-button-text="t('manage.user.operate.cancel')"
							:confirm-button-text="t('manage.user.operate.confirm')"
							@confirm="handleDelete(scope.row.uid)">
							<template #reference>
								<el-button type="danger" size="small">
									{{ t('manage.user.operate.delete.label') }}
								</el-button>
							</template>
						</el-popconfirm>
						<el-popconfirm :width="200" :title="t('manage.user.operate.set.confirm')" v-if="scope.row.role == UserRole.User"
							:cancel-button-text="t('manage.user.operate.cancel')"
							:confirm-button-text="t('manage.user.operate.confirm')"
							@confirm="handleSet(scope.row.uid, UserRole.Administrator)">
							<template #reference>
								<el-button type="warning" size="small">
									{{ t('manage.user.operate.set.label') }}
								</el-button>
							</template>
						</el-popconfirm>
						<el-popconfirm :width="200" :title="t('manage.user.operate.unset.confirm')" v-if="scope.row.role == UserRole.Administrator"
							:cancel-button-text="t('manage.user.operate.cancel')"
							:confirm-button-text="t('manage.user.operate.confirm')"
							@confirm="handleSet(scope.row.uid, UserRole.User)">
							<template #reference>
								<el-button type="warning" size="small">
									{{ t('manage.user.operate.unset.label') }}
								</el-button>
							</template>
						</el-popconfirm>
						<el-button type="success" size="small" @click="emailForm.uid=scope.row.uid; operateEmail=true">
							{{ t('manage.user.operate.email.label') }}
						</el-button>
						<el-button type="success" size="small" @click="passwordForm.uid=scope.row.uid; operatePassword=true">
							{{ t('manage.user.operate.password.label') }}
						</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
		<el-divider />
		<div style="display: flex;">
			<el-button type="primary" @click="getUserList"> {{ t('manage.user.operate.reload') }}  </el-button>
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
		<el-dialog
			v-model="operateEmail"
			:title="t('manage.user.operate.email.label')">
			<el-form :model="emailForm" ref="emailFormRef" :rules="emailRules" status-icon @submit.native.prevent>
				<el-form-item :error="emailError" prop="email">
					<el-input v-model="emailForm.email" autocomplete="off" 
					@keyup.enter.prevent="confirmEmail(emailFormRef)"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="operateEmail = false" text>
						{{ t('manage.user.operate.cancel') }}
					</el-button>
					<el-button type="primary" @click="confirmEmail(emailFormRef)" text bg>
						{{ t('manage.user.operate.confirm') }}
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
		v-model="operatePassword"
		:title="t('manage.user.operate.password.label')">
			<el-form :model="passwordForm" ref="passwordFormRef" :rules="passwordRules" 
			status-icon hide-required-asterisk @submit.native.prevent>
				<el-form-item :error="passwordError" prop="password">
					<el-input v-model="passwordForm.password" autocomplete="off" 
						clearable show-password
						@keyup.enter="confirmPassword(passwordFormRef)"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="operatePassword = false" text>
						{{ t('manage.user.operate.cancel') }}
					</el-button>
					<el-button type="primary" @click="confirmPassword(passwordFormRef)" text bg>
						{{ t('manage.user.operate.confirm') }}
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { UserDetail, UserRole } from '@/types/user';
import { post } from '@/api/index'
import throttle from 'lodash/throttle';
import { Search } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

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

const tagType = (role: UserRole) => {
	switch (role) {
		case UserRole.Administrator:
			return 'warning';
		default:
			return 'info';
	}
}

const { t } = useI18n();
const userlist = reactive<UserDetail[]>([]);
const loading = ref(false);
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
	getUserList();
}

const handleJump = (force: boolean) => {
	if (pagination.page != jump.value || force) {
		pagination.page = jump.value;
		getUserList();
	}
}

interface DeleteForm {
	uid: number;
};
interface Response {
	success: boolean;
	reason?: string;
};
const handleDelete = throttle((id: number) => {
	const request: DeleteForm = {
		uid: id,
	}
	post<Response>('/api/manage/delete', request).then(res => {
		const response = res.data;
		getUserList();
		if (response.success) {
			ElMessage.success(t('manage.user.operate.delete.success'));
		} else ElMessage.error(t('manage.user.operate.invaild'));
	});
}, 500);

interface SetForm {
	uid: number;
	role: UserRole;
}
const handleSet = throttle((id: number, role: UserRole) => {
	const request: SetForm = {
		uid: id,
		role: role
	}
	post<Response>('/api/manage/set', request).then(res => {
		const response = res.data;
		getUserList();
		if (response.success) {
			if (role == UserRole.Administrator)
				ElMessage.success(t('manage.user.operate.set.success'));
			else if (role == UserRole.User)
				ElMessage.success(t('manage.user.operate.unset.success'));
		} else ElMessage.error(t('manage.user.operate.invaild'));
	})
}, 500);

interface EmailForm {
	uid: number;
	email: string;
}
const operateEmail = ref(false);
const emailFormRef = ref<FormInstance>()
const emailForm = reactive<EmailForm>({
	uid: 0,
	email: ''
})
const emailRules = reactive<FormRules<EmailForm>>({
	email: [
		{ type: 'email', message: () => t('manage.user.operate.email.format'), trigger: 'blur'},
	],
});
const emailError = ref('');
const confirmEmail = throttle((formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			post<Response>('/api/manage/email', emailForm).then(res => {
				const response = res.data;
				if (response.success) {
					getUserList();
					operateEmail.value = false;
					ElMessage.success(t('manage.user.operate.email.success'));
				} else {
					emailError.value = t(`${response.reason!}`);
				}
			});
		} else return false;
	});
}, 500);
watch(emailForm, (_newValue, _oldValue) => {
	emailError.value = '';
})

interface PasswordForm {
	uid: number;
	password: string;
}
const operatePassword = ref(false);
const passwordFormRef = ref<FormInstance>()
const passwordForm = reactive<PasswordForm>({
	uid: 0,
	password: ''
});
const passwordRules = reactive<FormRules<PasswordForm>>({
	password: [
		{ required: true, message: () => t('manage.user.operate.password.required'), trigger: 'blur' },
		{ min: 6, message: () => t('manage.user.operate.password.minLength'), trigger: 'blur'},
		{ max: 20, message: () => t('manage.user.operate.password.maxLength'), trigger: 'blur'},
	]
})
const passwordError = ref('')
const confirmPassword = throttle((formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			post<Response>('/api/manage/password', passwordForm).then(res => {
				const response = res.data;
				if (response.success) {
					getUserList();
					operatePassword.value = false;
					ElMessage.success(t('manage.user.operate.password.success'));
				} else {
					passwordError.value = t(`${response.reason!}`);
				}
			});
		} else return false;
	});
}, 500);
watch(passwordForm, (_newValue, _oldValue) => {
	passwordError.value = '';
})

onMounted(() => {
	getUserList();
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