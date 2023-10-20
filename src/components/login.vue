<template>
	<el-dialog
		v-model="themeConfig.showLoginPanel"
		:title="isLogin ? t('login.title') : t('register.title')"
		center
		@closed="checkLogin()"
	>
		<div class="login-panel">
			<el-form ref="loginFormRef"
				:rules="loginRules" status-icon hide-required-asterisk
				:model="loginForm" label-width="80px" label-position="right">
				<el-form-item ref="usernameRef" :label="t('login.username')" prop="username"
					:error="loginErrorMsg['username']" >
					<el-input v-model="loginForm.username" clearable/> 
				</el-form-item>
				<el-form-item ref="passwordRef" :label="t('login.password')" prop="password" 
					:error="loginErrorMsg['password']" >
					<el-input v-model="loginForm.password" clearable show-password/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitLoginForm(loginFormRef)">
						{{ t('login.loginBtn') }}
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { router } from '@/router';
import type { FormInstance, FormRules } from 'element-plus'
import service from '@/utils/request';
import { Local } from '@/utils/storage';
import { UserRole, UserInfo } from '@/types/user.ts';

interface LoginForm {
	username: string;
	password: string;
}
interface LoginResponse {
	success: boolean;
	token?: string;
	userInfo?: UserInfo;
}

const props= defineProps({
	permission: { type: Array<UserRole>, required: true }
});
const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();
const isLogin = ref(true);
const checkLogin = () => {
	if (!props.permission.includes(userInfo.role)) router.back();
}
const loginFormRef = ref<FormInstance>()
const usernameRef = ref();
const passwordRef = ref();
const loginForm = reactive<LoginForm>({
	username: '',
	password: '',
});
const loginErrorMsg = reactive({
	username: '',
	password: '',
})
const loginRules = reactive<FormRules<LoginForm>>({
	username: [
		{ required: true, message: t('login.rules.username.required'), trigger: 'blur' },
		{ min: 3, message: t('login.rules.username.minLength'), trigger: 'blur'},
		{ max: 20, message: t('login.rules.username.maxLength'), trigger: 'blur'},
	],
	password: [
		{ required: true, message: t('login.rules.password.required'), trigger: 'blur' },
		{ min: 6, message: t('login.rules.password.minLength'), trigger: 'blur'},
		{ max: 20, message: t('login.rules.password.maxLength'), trigger: 'blur'},
	]
});

const submitLoginForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	if (loginErrorMsg.username == ' ') return; // 提示账号密码错误后未更改再次提交
  	formEl.validate((valid) => {
		if (valid) {
			service.post('/api/login', loginForm).then((res) => {
				const data: LoginResponse = res.data;
				if (data.success == true) {
					Local.set('Bearer', data.token!);
					userInfo.$patch(data.userInfo!);
					themeConfig.$patch({ showLoginPanel: false });
				} else {
					loginErrorMsg.username = ' ';
					loginErrorMsg.password = t('login.error');
				}
			}, (error) => {
				console.log("error: ", error);
			});
		} else {
			return false;
		}
	})
};

watch(loginForm, (_newVal, _oldVal) => {
	loginErrorMsg.username = '';
	loginErrorMsg.password = '';
});

</script>

<style scoped>
.login-panel {
	margin: 20px;
	max-width: 350px;
}

</style>