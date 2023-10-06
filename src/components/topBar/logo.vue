<template>
	<div class="topbar-logo">
		<img :src="themeConfig.isDarkMode ? logo_dark : logo" class="topbar-logo-img"/>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig';
import logo from '@assets/logo.png'
import logo_dark from '@assets/logo_dark.png'

const { themeConfig } = storeToRefs(useThemeConfig());


</script>

<style scoped>
	.topbar-logo {
		height: 50px;
		display: flex;
		align-items: center;
	}
   .topbar-logo-img {
		height: inherit;
   }
</style>