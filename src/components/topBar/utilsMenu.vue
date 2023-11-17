<template>
	<div class="utils-wrap">
		<DarkModeSwitch />
		<MessageSwitch />
		<I18nSwitch />
	</div>
</template>

<script setup lang="ts">
import MessageSwitch from './messageSwitch.vue';
import DarkModeSwitch from './darkModeSwitch/index.vue';
import I18nSwitch from './i18nSwitch.vue';

</script>

<style scoped>
.utils-wrap {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: inherit;
}
.elem {
	width: 50px;
}
</style>