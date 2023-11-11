<template>
	<div v-infinite-scroll="load" style="overflow: auto">
		<CoursePanel v-for="(item) in list" :info="item" />
	</div>
</template>

<script setup lang="ts">
import { CourseInfo } from '@/types/course';
import CoursePanel from '@/components/coursePanel.vue';

const props = defineProps({
	list: { type: Array<CourseInfo>, required: true },
});
const emit = defineEmits(['more']);

const load = () => {
	emit('more');
}


</script>

<style scoped>

</style>