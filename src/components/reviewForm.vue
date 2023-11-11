<template>
	<div class="reviewForm">
		<!-- 评价表单 -->
		<el-form :model="reviewForm" label-width="20%">
			<el-form-item :label="t('reviewForm.rating')">
				<el-rate v-model="reviewForm.rating"></el-rate>
			</el-form-item>
			<el-form-item :label="t('reviewForm.comment')" prop="comment">
					<el-input type="textarea" v-model="reviewForm.comment"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitReview">
					{{ t('reviewForm.submit') }}
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';

const { t } = useI18n();

const reviewForm = ref({
	// 评价表单字段...
	rating: 0,
	comment: '',
});

const submitReview = () => {
	ElMessage.success(t('reviewForm.submitSuccess'));
};

</script>
