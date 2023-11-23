<template>
	<el-table>
		<el-table-column prop="uid" :label="t('manage.user.uid')" />
		<el-table-column prop="username" :label="t('manage.user.username')" />
		<el-table-column prop="email" :label="t('manage.user.email')" />
		<el-table-column prop="role" :label="t('manage.user.role.label')" />
		<el-table-column prop="operate" :label="t('manage.user.operate.title')" fixed="right" />
	</el-table>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();


</script>

<style scoped>

</style>