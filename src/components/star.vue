<template>
	<div>
		<login />
		star
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';

const login = defineAsyncComponent(() => import('@components/login.vue'));
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

onMounted(() => {
	if (!userInfo.login) themeConfig.showLoginPanel = true;
})

</script>

<style scoped>

</style>