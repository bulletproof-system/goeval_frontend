<template>
	<el-tag effect="plain" :type="color">
		{{ t('tag.' + TagType[type]) }}
	</el-tag>
</template>

<script setup lang="ts">
import { TagType } from '@/types/course';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// @ts-ignore
const props = defineProps({
	type: {
		type: Number,
		required: true
	}
});

const color = computed(() => {
	switch (props.type) {
		case TagType.course:
			return 'success';
		case TagType.school:
			return 'info';
		case TagType.teacher:
			return 'warning';
		case TagType.tag:
			return 'danger';
	}
})
</script>

<style scoped>

</style>