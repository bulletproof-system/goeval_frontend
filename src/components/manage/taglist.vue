<template>
	<el-tag v-for="(item, index) in list" style="margin-right: 5px; width: 50px;" 
	closable @close="list.splice(index, 1)"> 
		{{ item }} 
	</el-tag>
	<!-- <el-input
		v-if="input"
		ref="InputRef"
		v-model="inputValue"
		size="small"
		@keyup.enter="handleInputConfirm"
		@blur="handleInputConfirm"
	/> -->
	<el-select v-if="input" v-model="inputValue" filterable @change="handleInputConfirm" @blur="inputValue=''; input=false">
		<el-option v-for="item in allow.filter((value) => !list.includes(value))" :value="item" />
	</el-select>
	<el-button v-else size="small" @click="showInput">
		{{ t('manage.taglist.new') }}
	</el-button>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ElInput } from 'element-plus'

const props = defineProps({
	list: { type: Array<string>, required: true },
	allow: { type: Array<string>, default: []}
})
const emits = defineEmits(['update:list'])
const { t } = useI18n()
const inputValue = ref('');
const input = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
	const showInput = () => {
	input.value = true
	nextTick(() => {
		InputRef.value!.input!.focus()
	})
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    props.list.push(inputValue.value)
  }
  input.value = false
  inputValue.value = ''
}

</script>