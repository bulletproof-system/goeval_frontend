<template>

</template>

<script setup lang="ts">
import { CourseInfo } from '@/types/course';

const props = defineProps({
	info: { type: CourseInfo, required: true },
});

</script>

<style lang="scss" scoped>

</style>