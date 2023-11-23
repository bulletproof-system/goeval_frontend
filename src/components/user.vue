<template>
	<div class="card-warp">
		<el-card class="box-card">
			<el-row>
				<el-col :span="16">
					<el-descriptions
						:column="1"
					>
						<el-descriptions-item>
							<template #label>
								<el-text>
									<el-icon><User /></el-icon>
									{{ t('userInfo.userName') }}
								</el-text>
							</template>
							<el-text>
								{{ userInfo.userName }}
							</el-text>
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<el-text>
									<el-icon><Message /></el-icon>
									{{ t('userInfo.email') }}
								</el-text>
							</template>
							<el-text>
								{{ userInfo.email }}
							</el-text>
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<el-text>
										<el-icon><Key /></el-icon>
										{{ t('userInfo.role.name') }}
									</el-text>
								</template>
								<el-text>
									{{ t(`userInfo.role.${userInfo.role}`) }}
								</el-text>
						</el-descriptions-item>
					</el-descriptions>
				</el-col>
				<el-col :span="8">
					<el-avatar :size="100" :src="userInfo.avatar" />
				</el-col>
			</el-row>
			<el-divider />
			<div>
				<el-button type="primary" text bg @click="operateEmail = true">
					{{ t('userInfo.operate.email.detail') }}
				</el-button>
				<el-button type="primary" text bg @click="operateAvatar">
					{{ t('userInfo.operate.avatar') }}
				</el-button>
				<el-button type="danger" text bg @click="operatePassword = true">
					{{ t('userInfo.operate.password.detail') }}
				</el-button>
				<el-button type="danger" text bg @click="userInfo.logout">
					{{ t('userInfo.operate.logout') }}
				</el-button>
			</div>
		</el-card>
	</div>
	<el-dialog
		v-model="operateEmail"
		:title="t('userInfo.operate.email.detail')"
	>
		<el-form :model="emailForm" ref="emailFormRef" :rules="emailRules" status-icon>
			<el-form-item :error="emailError" prop="email">
				<el-input v-model="emailForm.email" autocomplete="off" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="operateEmail = false" text>
					{{ t('userInfo.operate.cancel') }}
				</el-button>
				<el-button type="primary" @click="confirmEmail(emailFormRef)" text bg>
					{{ t('userInfo.operate.confirm') }}
				</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog
		v-model="operatePassword"
		:title="t('userInfo.operate.password.detail')"
	>
		<el-form :model="passwordForm" ref="passwordFormRef" :rules="passwordRules" status-icon>
			<el-form-item :error="passwordError.oldPassword" prop="oldPassword">
				<el-input v-model="passwordForm.oldPassword" autocomplete="off" 
					clearable show-password
				/>
			</el-form-item>
			<el-form-item :error="passwordError.newPassword" prop="newPassword">
				<el-input v-model="passwordForm.newPassword" autocomplete="off" 
					clearable show-password
				/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="operatePassword = false" text>
					{{ t('userInfo.operate.cancel') }}
				</el-button>
				<el-button type="primary" @click="confirmPassword(passwordFormRef)" text bg>
					{{ t('userInfo.operate.confirm') }}
				</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';
import { User, Message, Key } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus'
import { post } from '@/api/index'

interface EmailForm {
	email: string;
}
interface EmailResponse {
	success: boolean;
	reason?: string;
}
interface PasswordForm {
	oldPassword: string,
	newPassword: string,
}
interface PasswordResponse {
	success: boolean;
	reason?: string;
}

const permission = [UserRole.User, UserRole.Administrator];
const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

onMounted(() => {
	if (!permission.includes(userInfo.role)) themeConfig.showLoginPanel = true;
});

const operateEmail = ref(false);
const emailFormRef = ref<FormInstance>()
const emailForm = reactive<EmailForm>({
	email: ''
});
const emailRules = reactive<FormRules<EmailForm>>({
	email: [
		{ type: 'email', message: t('userInfo.operate.email.format'), trigger: 'blur'},
	],
});
const emailError = ref('');
const confirmEmail = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			post<EmailResponse>('/api/operate/email', emailForm.email).then(res => {
				const response = res.data;
				if (response.success) {
					userInfo.email = emailForm.email;
					operateEmail.value = false;
					ElMessage.success(t('userInfo.operate.email.success'));
				} else
					emailError.value = t(response.reason!);
			});
		} else return false;
	});
}
watch(emailForm, (_newValue, _oldValue) => {
	emailError.value = '';
})

const operatePassword = ref(false);
const passwordFormRef = ref<FormInstance>()
const passwordForm = reactive<PasswordForm>({
	oldPassword: '',
	newPassword: '',
});
const passwordRules = reactive<FormRules<PasswordForm>>({
	newPassword: [
		{ required: true, message: t('userInfo.operate.password.required'), trigger: 'blur' },
		{ min: 6, message: t('userInfo.operate.password.minLength'), trigger: 'blur'},
		{ max: 20, message: t('userInfo.operate.password.maxLength'), trigger: 'blur'},
	]
})
const passwordError = reactive({
	oldPassword: '',
	newPassword: '',
})
const confirmPassword = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			post<PasswordResponse>('/api/operate/password', passwordForm).then(res => {
				const response = res.data;
				if (response.success) {
					operatePassword.value = false;
					userInfo.logout();
					ElMessage.success(t('userInfo.operate.password.success'));
				} else {
					passwordError.oldPassword = t(`${response.reason!}.old`);
					passwordError.newPassword = t(`${response.reason!}.new`);
				}
			});
		} else return false;
	});
}
watch(passwordForm, (_newValue, _oldValue) => {
	passwordError.oldPassword = '';
	passwordError.newPassword = '';
})

const operateAvatar = () => {
	
};

</script>

<style scoped>

.card-warp {
	display: flex;
  align-items: center;
  justify-content: center;
}

.box-card {
	width: 600px;
	text-align: center;
}

</style>