<template>
	<el-dialog :v-model=visible title="Shipping address">
		<el-table :data="gridData">
			<el-table-column property="date" label="Date" width="150" />
			<el-table-column property="name" label="Name" width="200" />
			<el-table-column property="address" label="Address" />
		</el-table>
	</el-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { computed } from 'vue'
const props = defineProps<{
	visible: Boolean;
}>();


const visible =  computed({
	get: () => props.visible,
	set: (value) => {
		console.log(value)
	}
});


const gridData = [
	{
		date: '2016-05-02',
		name: 'John Smith',
		address: 'No.1518,  Jinshajiang Road, Putuo District',
	},
	{
		date: '2016-05-04',
		name: 'John Smith',
		address: 'No.1518,  Jinshajiang Road, Putuo District',
	},
	{
		date: '2016-05-01',
		name: 'John Smith',
		address: 'No.1518,  Jinshajiang Road, Putuo District',
	},
	{
		date: '2016-05-03',
		name: 'John Smith',
		address: 'No.1518,  Jinshajiang Road, Putuo District',
	},
]
</script>
<style scoped></style>
  