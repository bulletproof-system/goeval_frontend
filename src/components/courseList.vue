<template>
	<div class="list">
		<CoursePanel class="panel" v-for="(item) in list" :info="item" />
	</div>
</template>

<script setup lang="ts">
import { CourseInfo } from '@/types/course';
import CoursePanel from '@/components/coursePanel.vue';

// @ts-ignore
const props = defineProps({
	list: { type: Array<CourseInfo>, required: true },
});

</script>

<style scoped>

.list {
	display: flex;
	overflow: auto;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

.panel {
	width: 300px;
	margin: 10px;
	
	animation-name: show;
	animation-duration: 2s;

}

@keyframes show {
	0% {opacity: 0;}
    100% {opacity: 1;}
}

</style>