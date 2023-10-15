<template>
	<el-dialog
		v-model="themeConfig.showLoginPanel"
		:title="isLogin ? t('login.login') : t('login.register')"
		center
		@closed="checkLogin()"
	>

	</el-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { router } from '@/router';

const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

const isLogin = ref(true);

const checkLogin = () => {
	if (!userInfo.login) router.back();
}

</script>

<style scoped>

</style>