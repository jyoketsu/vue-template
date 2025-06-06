<script setup lang="ts">
import { ref, watch } from 'vue';
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
	file: File | null;
}>();

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'ok', value: any): void;
}>();

const dialogVisible = ref(false);
const loading = ref(false);
const base64 = ref('');
const cropperRef = ref<InstanceType<typeof Cropper>>();

watch(
	() => props.file,
	(val) => {
		if (val) {
			dialogVisible.value = true;
			const reader = new FileReader();
			reader.readAsDataURL(val);
			reader.onload = (e) => {
				base64.value = e.target?.result as string;
			}

		} else {
			dialogVisible.value = false;
			base64.value = '';
		}
	},
	{
		immediate: true,
	}
);

const getBase64 = () => {
	if (cropperRef.value) {
		const { canvas } = cropperRef.value.getResult();
		return canvas!.toDataURL(props.file?.type || 'image/jpeg');
	}
	return null;
};

const handleUpload = () => {
	emit('ok', getBase64())
}

</script>

<template>
	<el-dialog v-model="dialogVisible" title="图片裁剪" width="420" align-center @close="emit('close')">
		<div class="w-full">
			<div class="w-full h-[420px]">
				<cropper class="cropper h-[430px] bg-[#DDD]" :src="base64" :stencil-props="{
					aspectRatio: 1
				}" :stencil-component="CircleStencil" ref="cropperRef">
				</cropper>
			</div>

		</div>
		<template #footer>
			<div class="flex justify-center items-center">
				<el-button class="w-[116px] !bg-[#EEEEEE] !text-[#9FA5B0] hover:!text-[#8f949e] !border-none rounded-[5px]"
					@click="emit('close')">取消</el-button>
				<el-button class="w-[116px] bg-gradient-to-r from-[#4FD453] to-[#0EA1FF] !border-none rounded-[5px]"
					type="primary" :disabled="loading" @click="handleUpload">
					上传
				</el-button>
			</div>
		</template>

	</el-dialog>
</template>
