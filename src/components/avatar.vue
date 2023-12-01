<template>
	<el-upload ref="uploadRef" :action="url" :headers="header" method="post" 
	:show-file-list="false" :before-upload="beforeAvatarUpload"
	accept="image/jpeg, image/png, image/gif" :on-success="handleAvatarSuccess">
		<el-avatar :size="100" :src="userInfo.avatar" />
	</el-upload>
</template>

<script setup lang="ts">
import { useUserInfo } from '@/stores/userInfo';
import { Local } from '@/utils/storage';
import type { UploadProps } from 'element-plus'
import { useI18n } from 'vue-i18n';
import { UploadInstance } from 'element-plus';

const { t } = useI18n();
const userInfo = useUserInfo();
const url = import.meta.env.VITE_API_URL + '/api/operate/upload'
const header = reactive({
	'Authorization' : `${Local.get('Bearer')?.Bearer ?? ''}`
})
const allowTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!allowTypes.includes(rawFile.type)) {
    ElMessage.error(t('userInfo.operate.avatar.type'));
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error(t('userInfo.operate.avatar.size'));
    return false
  }
  return true
}

const uploadRef = ref<UploadInstance>();
const upload = () => {
	uploadRef.value?.$el.querySelector('input').click()
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
	response,
) => {
	if (response.success == true) {
		userInfo.setAvatar(response.avatar);
	} else { ElMessage.error(t(response.reason)) }
}

defineExpose({
	upload,
})

</script>