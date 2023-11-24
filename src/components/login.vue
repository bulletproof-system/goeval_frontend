<template>
	<el-dialog
		v-model="themeConfig.showLoginPanel"
		:title="isLogin ? t('login.title') : t('register.title')"
		center
		@closed="checkLogin()">
		<div class="login-panel">
			<el-form ref="loginFormRef" v-if="isLogin"
				:rules="loginRules" status-icon hide-required-asterisk
				:model="loginForm" label-width="80px" label-position="right">
				<el-form-item :label="t('login.username')" prop="username"
					:error="loginError['username']" >
					<el-input v-model="loginForm.username" clearable/> 
				</el-form-item>
				<el-form-item :label="t('login.password')" prop="password" 
					:error="loginError['password']" >
					<el-input v-model="loginForm.password" 
						clearable show-password
						@keyup.enter="submitLoginForm(loginFormRef)"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" link @click="isLogin = false">
						{{ t('login.loginTip') }}
					</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitLoginForm(loginFormRef)">
						{{ t('login.loginBtn') }}
					</el-button>
				</el-form-item>
			</el-form>
			<el-form ref="registerFormRef" v-else
				:rules="registerRules" status-icon hide-required-asterisk
				:model="registerForm" label-width="80px" label-position="right">
				<el-form-item :label="t('register.username')" prop="username"
					:error="registerError.username" >
					<el-input v-model="registerForm.username" clearable/> 
				</el-form-item>
				<el-form-item :label="t('register.password')" prop="password" 
					:error="registerError.password" >
					<el-input v-model="registerForm.password" 
						clearable show-password
						@keyup.enter="submitRegisterForm(registerFormRef)"
					/>
				</el-form-item>
				<el-form-item :label="t('register.email')" prop="email" 
					:error="registerError.email" >
					<el-input v-model="registerForm.email" 
						clearable
						@keyup.enter="submitRegisterForm(registerFormRef)"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" link @click="isLogin = true">
						{{ t('register.registerTip') }}
					</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitRegisterForm(registerFormRef)">
						{{ t('register.registerBtn') }}
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
import { UserRole, UserInfo } from '@/types/user.ts';
import { post } from '@/api/index'

interface LoginForm {
	username: string;
	password: string;
}
interface LoginResponse {
	success: boolean;
	info?: {
		token: string;
		userInfo: UserInfo;
	}
	reason?: string;
}
interface RegisterForm {
	username: string;
	password: string;
	email: string;
}
interface RegisterResponse {
	success: boolean;
	info?: {
		token: string;
		userInfo: UserInfo;
	}
	reason?: string;
}

const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();
const isLogin = ref(true);
const checkLogin = () => {
	if (userInfo.role == UserRole.Visitor) 
		router.push({ name: 'home' })
}

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
	username: '',
	password: '',
});
const loginError = reactive({
	username: '',
	password: '',
})
const loginRules = reactive<FormRules<LoginForm>>({
	username: [
		{ required: true, message: () => t('login.rules.username.required'), trigger: 'blur' },
		{ min: 3, message: () => t('login.rules.username.minLength'), trigger: 'blur'},
		{ max: 20, message: () => t('login.rules.username.maxLength'), trigger: 'blur'},
	],
	password: [
		{ required: true, message: () => t('login.rules.password.required'), trigger: 'blur' },
		{ min: 6, message: () => t('login.rules.password.minLength'), trigger: 'blur'},
		{ max: 20, message: () => t('login.rules.password.maxLength'), trigger: 'blur'},
	]
});
const submitLoginForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	if (loginError.username == ' ') return; // 提示账号密码错误后未更改再次提交
  	formEl.validate((valid) => {
		if (valid) {
			post<LoginResponse>('/api/login', loginForm).then((res) => {
				const response = res.data;
				if (response.success == true) {
					const info = response.info!;
					userInfo.login(info.userInfo, info.token);
					themeConfig.$patch({ showLoginPanel: false });
				} else {
					const reason = response.reason!;
					loginError.username = t(`${reason}.u`);
					loginError.password = t(`${reason}.p`);
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
	loginError.username = '';
	loginError.password = '';
});

const registerFormRef = ref<FormInstance>();
const registerForm = reactive<RegisterForm>({
	username: '',
	password: '',
	email: '',
});
const registerError = reactive({
	username: '',
	password: '',
	email: '',
});
const registerRules = reactive<FormRules<RegisterForm>>({
	username: [
		{required: true, message: () => t('register.rules.username.required'), trigger: 'blur'},
		{min: 3, message: () => t('register.rules.username.minLength'), trigger: 'blur'},
		{max: 15, message: () => t('register.rules.username.maxLength'), trigger: 'blur'}
	],
	password: [
		{required: true, message: () => t('register.rules.password.required'), trigger: 'blur'},
		{min: 6, message: () => t('register.rules.password.minLength'), trigger: 'blur'},
		{max: 20, message: () => t('register.rules.password.maxLength'), trigger: 'blur'}
	],
	email: [
		{type: "email", message: () => t('register.rules.email.format'), trigger: 'blur'}
	]
});
const submitRegisterForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	// if (registerError.username == ' ') return; // 提示账号密码错误后未更改再次提交
  	formEl.validate((valid) => {
		if (valid) {
			post<RegisterResponse>('/api/register', registerForm).then((res) => {
				const response = res.data;
				if (response.success == true) {
					const info = response.info!;
					userInfo.login(info.userInfo, info.token);
					themeConfig.$patch({ showLoginPanel: false });
				} else {
					const reason = response.reason!;
					registerError.username = t(`${reason}.u`);
					registerError.password = t(`${reason}.p`);
					registerError.email = t(`${reason}.e`);
				}
			}, (error) => {
				console.log("error: ", error);
			});
		} else {
			return false;
		}
	})
};
watch(registerForm, (_oldVal, _newVal) => {
	registerError.username = ' ';
	registerError.password = ' ';
	registerError.email = ' ';
})

</script>

<style scoped>
.login-panel {
	margin: 20px;
	max-width: 350px;
}

</style>