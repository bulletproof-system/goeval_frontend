<template>
	<div>
		
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';

const permission = [UserRole.User, UserRole.Administrator];
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

onMounted(() => {
	if (!permission.includes(userInfo.role)) themeConfig.showLoginPanel = true;
})

</script>

<style scoped>

</style>