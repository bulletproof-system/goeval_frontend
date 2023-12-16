<template>
	<div class="navBar">
		<el-menu router style="height: inherit;"
			:default-active="router.currentRoute.value.path"
			mode="horizontal"
			:ellipsis="false"
		>
			<el-menu-item index="/home"> {{ t('topBar.home') }} </el-menu-item>
			<el-menu-item index="/star"> {{ t('topBar.star') }} </el-menu-item>
			<el-menu-item v-if="userInfo.role == UserRole.Administrator" index="/manage"> {{ t('topBar.manage') }} </el-menu-item>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { router } from '@/router';
import { useUserInfo } from '@/stores/userInfo';
import { UserRole } from '@/types/user';

const { t } = useI18n();
const userInfo = useUserInfo();
</script>

<style scoped>
.navBar {
	height: inherit;
	padding-left: 10px;
}

</style>