<template>
	<div class="detail">
		<infoBlock />
		<!-- 使用for添加十个reviewBlock -->
		<reviewBlock v-for="i in 10" :key="i" />
		<el-backtop :right="100" :bottom="100"/>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import infoBlock from '@/components/infoBlock.vue';

const { t } = useI18n();


</script>

<style scoped>
.home {
	padding-left: 200px;
	padding-right: 200px;
}
</style>