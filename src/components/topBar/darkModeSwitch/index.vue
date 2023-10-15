<template>
	<div>
		<el-switch 
			v-model="theme" 
			:active-action-icon="Dark"
			:inactive-action-icon="Light"
			class="dark-mode-switch"
			@click="toggleDarkMode()"
		/>
	</div>
</template>

<script setup lang="ts">
import { isDark, toggleDarkMode } from '@/stores/themeConfig';
import Light from './light.vue';
import Dark from './dark.vue';

const theme = ref<boolean>(isDark.value)

</script>

<style scoped>
.dark-mode-switch {
	--el-switch-on-color: #7C7C7C;
	--el-switch-off-color: #e6dede;
	margin-left: 5px;
	margin-right: 10px;
}
</style>