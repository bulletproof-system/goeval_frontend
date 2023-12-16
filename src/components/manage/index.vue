<template>
	<el-container style="height: 100%;">
		<el-aside width="70px" style="height: 100%;">
			<el-menu collapse style="height: 100%;" router :default-active="router.currentRoute.value.path">
				<el-menu-item index="/manage/user" route="/manage/user">
					<el-icon><User /></el-icon>
					<template #title> {{ t('manage.user.title') }} </template>
				</el-menu-item>
				<el-menu-item index="/manage/course" route="/manage/course">
					<el-icon><Collection /></el-icon>
					<template #title> {{ t('manage.course.title') }} </template>
				</el-menu-item>
				<el-menu-item index="/manage/announcement" route="/manage/announcement">
					<el-icon><Bell /></el-icon>
					<template #title> {{ t('manage.announcement.title') }} </template>
				</el-menu-item>
				<el-menu-item index="/manage/teacher" route="/manage/teacher">
					<el-icon><Avatar /></el-icon>
					<template #title> {{ t('manage.teacher.title') }} </template>
				</el-menu-item>
				<el-menu-item index="/manage/tag" route="/manage/tag">
					<el-icon><PriceTag /></el-icon>
					<template #title> {{ t('manage.tag.title') }} </template>
				</el-menu-item>
			</el-menu>
	  	</el-aside>
    	<el-main class="no-padding">
			<router-view v-slot="{ Component }">
				<transition name="fade">
					<component :is="Component" />
				</transition>
			</router-view>
		</el-main>
	</el-container>
	
	
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserInfo } from '@/stores/userInfo';
import { useThemeConfig } from '@/stores/themeConfig';
import { UserRole } from '@/types/user.ts';
import { User, Collection, Bell, Avatar, PriceTag } from '@element-plus/icons-vue';
import { router } from '@/router';

const permission = [UserRole.Administrator];
const { t } = useI18n();
const userInfo = useUserInfo();
const themeConfig = useThemeConfig();

onMounted(() => {
	if (!permission.includes(userInfo.role)) themeConfig.showLoginPanel = true;
})


</script>

<style scoped>

.no-padding {
  padding: 0px;
}
.menu {
	height: calc(100vh - var(--el-header-height));
}
.flex-grow {
  flex-grow: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>