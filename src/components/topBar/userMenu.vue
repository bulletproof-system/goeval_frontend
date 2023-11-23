<template>
	<el-dropdown style="height: inherit; margin-left: 5px;">
		<div class="avatar">
			<el-avatar :size="40" fit="fill" :src="userInfo.avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-if="userInfo.role==UserRole.Visitor" @click="themeConfig.showLoginPanel = true">
					{{ t('topBar.user.login') }}
				</el-dropdown-item>
				<el-dropdown-item v-if="userInfo.role!=UserRole.Visitor" @click="router.push({ name: 'user' })">
					{{ t('topBar.user.center') }}
				</el-dropdown-item>
				<el-dropdown-item v-if="userInfo.role!=UserRole.Visitor" @click="userInfo.logout">
					{{ t('topBar.user.logout') }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';
import { router } from '@/router';

const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

</script>

<style scoped>

.avatar {
	height: inherit;
	width: inherit;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

</style>