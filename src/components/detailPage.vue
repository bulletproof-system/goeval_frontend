<template>
	<div class="detail">
		<el-row>
			<el-col :span="18" :offset="3">
				<infoBlock />
			</el-col>

		</el-row>
		<el-row :gutter="20">
			<el-col :span="9" :offset="3">
				<reviewBlock v-for="i in 10" :key="i" />
			</el-col>
			<el-col :span="9">
				<reviewBlock v-for="i in 10" :key="i" />
			</el-col>
		</el-row>
		<el-backtop :right="100" :bottom="100" />
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