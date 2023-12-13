<template>
	<el-button class="switch" @click="drawer = !drawer" text>
		<el-badge :value="message.getUnread" :max="99" :hidden="message.getUnread == 0">
			<svg v-if="isDark" height="30px" width="30px"  t="1700188141434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1493"><path d="M328.085333 266.666667l161.28-161.28a32 32 0 0 1 45.269334 0l161.28 161.28H970.666667v661.333333h-917.333334v-661.333333h274.752z m90.496 0h186.837334L512 173.248 418.581333 266.666667zM117.333333 330.666667v533.333333h789.333334v-533.333333h-789.333334zM234.666667 469.333333h554.666666v64H234.666667v-64z m0 192h277.333333v64H234.666667v-64z" fill="#dbdbdb" p-id="1494" data-spm-anchor-id="a313x.search_index.0.i2.5ad03a81L5xG1I" class="selected"></path></svg>
			<svg v-else height="30px" width="30px"  t="1700188141434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1493"><path d="M328.085333 266.666667l161.28-161.28a32 32 0 0 1 45.269334 0l161.28 161.28H970.666667v661.333333h-917.333334v-661.333333h274.752z m90.496 0h186.837334L512 173.248 418.581333 266.666667zM117.333333 330.666667v533.333333h789.333334v-533.333333h-789.333334zM234.666667 469.333333h554.666666v64H234.666667v-64z m0 192h277.333333v64H234.666667v-64z" fill="#2c2c2c" p-id="1494" data-spm-anchor-id="a313x.search_index.0.i2.5ad03a81L5xG1I" class="selected"></path></svg>
		</el-badge>
	</el-button>
	
	<el-drawer
		v-model="drawer"
		:with-header="false"
		direction="rtl"
		:size="500"
		style="height: calc(100vh); top: auto;">
		<template #default>
			<el-tabs stretch style="height: 100%;">
				<el-tab-pane style="height: 100%;">
					<template #label>
						<el-text>
							<el-icon style="margin-right: 3px;"><Bell /></el-icon>
							{{ t('message.announcement.title') }}
						</el-text>
					</template>
					<template #default>
						<el-scrollbar style="height: 100%;">
							<div v-for="(item) in message.announcements" @click.native="showAnnouncementDetail(item)">
								<el-space direction="vertical" alignment="normal">
									<el-text tag="b">{{ item.title }} <br/> </el-text>
									<el-text line-clamp="2" style="white-space: pre-wrap; word-break: break-all;" > {{ item.content }} </el-text>
									<el-text> {{ item.datetime.toLocaleString() }} </el-text>
								</el-space>
								<el-divider />
							</div>
						</el-scrollbar>
					</template>
				</el-tab-pane>
				<el-tab-pane style="height: 100%;">
					<template #label>
						<el-text>
							<el-icon style="margin-right: 3px;"><ChatLineRound /></el-icon>
							{{ t('message.notification.title') }}
						</el-text>
					</template>
					<template #default>
						<el-scrollbar style="height: 100%;">
							<div v-for="(item, index) in message.notifications" @click.native="handleRead(index)">
								<el-text tag="b"> 
									<el-tag v-if="item.status == MessageStatus.unread"> {{ t('message.notification.unread') }} </el-tag>
									<el-tag :type="item.ntype == NotificationType.star ? 'success' : 'warning'">
										{{ t(`message.notification.${NotificationType[item.ntype]}.tag`) }}
									</el-tag>
									{{ t(`message.notification.${NotificationType[item.ntype]}.message`, [item.course_name]) }} <br/> 
								</el-text>
								<el-text> {{ item.datetime.toLocaleString() }} </el-text>
								<el-divider />
							</div>
						</el-scrollbar>
					</template>
				</el-tab-pane>
			</el-tabs>
		</template>
	</el-drawer>
	
	<el-dialog
		v-model="announcementDetail"
		:title="announcement.title"
		width="40vw"
		align-center
	>
		<el-text style="white-space: pre-wrap; word-break: break-all;"> {{ announcement.content }} </el-text>
		<el-text> <br/> <br/> </el-text>
		<el-text> {{ announcement.datetime }} </el-text>
	</el-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { isDark } from '@/stores/themeConfig';
import { Bell, ChatLineRound } from '@element-plus/icons-vue';
import { useMessage } from '@/stores/userInfo';
import throttle from 'lodash/throttle';
import { Announcement, NotificationType, MessageStatus } from '@/types/user';
import { useRouter } from 'vue-router'

const { t } = useI18n();
const drawer = ref(false)
const message = useMessage();
const announcementDetail = ref(false)
const announcement: Ref<Announcement> = ref({
	aid: -1,
	title: "error",
	content: "error",
	datetime: new Date(),
} as Announcement);
const router = useRouter();

onMounted(() => {
	message.getAnnouncements();
	message.getNotifications();
})

watch(drawer, async (val) => {
	if (val == true) {
		message.getAnnouncements();
		message.getNotifications();
	}
})

const showAnnouncementDetail = throttle((item: Announcement) => {
	announcement.value = item;
	announcementDetail.value = true;
}, 500)

const handleRead = throttle((index: number) => {
	message.readNotification(index);
	drawer.value = false;
	let notification = message.notifications[index]
	router.push({ name: 'course', params: { 
		course_id: notification.course_id.toString(), 
		review_id: notification.review_id.toString(), 
		comment_id: (notification.comment_id || "").toString()
	}})
}, 500)

</script>

<style scoped>
.switch {
	/* margin-right: 5px; */
	height: inherit;
}
.item{
	width: inherit;
}

.el-tabs :deep(.el-tabs__content) {
	height: calc(100% - var(--el-tabs-header-height));
}

.label {
	display: flex;
	align-items: center;
}

</style>