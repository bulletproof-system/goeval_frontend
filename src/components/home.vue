<template>
	<div class="home">
		<el-autocomplete
			v-model="search"
			:placeholder="t('search.placeholder')"
			:prefix-icon="Search"
		>
		</el-autocomplete>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue'

const { t } = useI18n();
const search = ref('');

</script>

<style scoped>
.home {
	padding-left: 20px;
	padding-right: 20px;
}
</style>