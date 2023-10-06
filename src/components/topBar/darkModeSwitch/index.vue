<template>
	<div>
		<el-switch 
			v-model="themeConfig.isDarkMode" 
			:active-action-icon="Dark"
			:inactive-action-icon="Light"
			class="dark-mode-switch"
		/>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig';
import Light from './light.vue';
import Dark from './dark.vue';

const { themeConfig } = storeToRefs(useThemeConfig());

</script>

<style scoped>
.dark-mode-switch {
	--el-switch-on-color: #1c1c1c;
	--el-switch-off-color: #e6dede;
	margin-left: 5px;
	margin-right: 10px;
}
</style>