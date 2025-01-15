<script setup lang="ts">
import { ref, watch } from 'vue';
import Account from './account/index.vue'

const props = defineProps<{
	visible: boolean;
}>();
const emit = defineEmits(['close']);
const visible = ref(false);

watch(
	() => props.visible,
	(val) => {
		visible.value = val;
	}
);

watch(visible, (val) => {
	if (!val) {
		emit('close');
	}
});
</script>

<template>
	<el-dialog v-model="visible" destroy-on-close width="500" :show-close="false" header-class="options-dialog-header">
		<div>
			<Account />
		</div>
	</el-dialog>
</template>

<style>
.options-dialog-header {
	padding: unset;
}
</style>