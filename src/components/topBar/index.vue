<template>
	<div class="topbar-index">
		<Logo />
		<NavBar />
		<Breadcrumb />
		<div class="flex-grow"></div>
		<UtilsMenu />
		<UserMenu />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// 引入组件
const Logo = defineAsyncComponent(() => import('@components/topBar/logo.vue'));
const NavBar = defineAsyncComponent(() => import('@components/topBar/navBar.vue'));
const Breadcrumb = defineAsyncComponent(() => import('@components/topBar/breadcrumb.vue'));
const UtilsMenu = defineAsyncComponent(() => import('@components/topBar/utilsMenu.vue'));
const UserMenu = defineAsyncComponent(() => import('@components/topBar/userMenu.vue'));

</script>

<style scoped lang="scss">
.topbar-index {
	height: 50px;
	display: flex;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #4c4d4f;
	background-color: var(--bg-topBar-color);
	transition: background-color 0.2s ease;
}

.flex-grow {
  flex-grow: 1;
}
</style>