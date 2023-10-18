<template>
	<el-dialog
		ref="loginFormRef"
		v-model="themeConfig.showLoginPanel"
		:title="isLogin ? t('login.title') : t('register.title')"
		center
		@closed="checkLogin()"
	>
		<div class="login-panel">
			<el-form :rules="loginRules" status-icon hide-required-asterisk
				:model="loginForm" label-width="80px" label-position="right">
				<el-form-item :label="t('login.username')" prop="username">
					<el-input v-model="loginForm.username" clearable/> 
				</el-form-item>
				<el-form-item :label="t('login.password')" prop="password">
					<el-input v-model="loginForm.password" clearable show-password/> 
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitLoginForm(loginFormRef)" />
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

interface LoginForm {
	username: string;
	password: string;
}

const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();
const isLogin = ref(true);
const checkLogin = () => {
	if (!userInfo.login) router.back();
}
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
	username: '',
	password: '',
});
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
	
};

</script>

<style scoped>
.login-panel {
	margin: 20px;
	max-width: 350px;
}

</style>