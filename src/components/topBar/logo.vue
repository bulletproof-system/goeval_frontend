<template>
	<div class="topbar-logo">
		<img :src="isDark ? logo_dark : logo" class="topbar-logo-img"/>
	</div>
</template>

<script setup lang="ts">
import { isDark } from '@/stores/themeConfig';
import logo from '@assets/logo.png'
import logo_dark from '@assets/logo_dark.png'

// const isDark = useDark();

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