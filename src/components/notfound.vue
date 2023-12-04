<template>
	<div class="panel">
		<img class="show" alt="403 forbidden" src="../assets/forbidden.svg">
	</div>
</template>
   
<script lang="ts" setup>
const isShown = ref(false);
onMounted(() => {
	isShown.value = true;
});
</script>
   
<style scoped>
.panel {
	display: flex;
	justify-content: center;
}

.show {
	width: 40%;
}
</style>