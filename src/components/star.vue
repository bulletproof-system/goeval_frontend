<template>
	<div>
		<login :permission="permission" />
		star
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';

const permission = [UserRole.User, UserRole.Administrator];
const login = defineAsyncComponent(() => import('@components/login.vue'));
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

onMounted(() => {
	if (!permission.includes(userInfo.role)) themeConfig.showLoginPanel = true;
})

</script>

<style scoped>

</style>