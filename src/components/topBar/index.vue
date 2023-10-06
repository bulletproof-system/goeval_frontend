<template>
	<div class="topbar-index">
		<Logo />
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
const Breadcrumb = defineAsyncComponent(() => import('@components/topBar/breadcrumb.vue'));
const UtilsMenu = defineAsyncComponent(() => import('@components/topBar/utilsMenu.vue'));
const UserMenu = defineAsyncComponent(() => import('@components/topBar/userMenu.vue'));

</script>

<style scoped>
.topbar-index {
	height: 50px;
	display: flex;
	align-items: center;

}

.flex-grow {
  flex-grow: 1;
}
</style>