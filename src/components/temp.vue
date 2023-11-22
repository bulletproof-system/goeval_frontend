<template>
	<el-button text @click="showReviewForm">
		open a Table nested Dialog
	</el-button>

	<temp2 :visible="dialogTableVisible"></temp2>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import temp2 from './temp2.vue';
const showReviewForm = () => {
	dialogTableVisible.value = true;
};



const dialogTableVisible = ref(true)

</script>
<style scoped></style>
  