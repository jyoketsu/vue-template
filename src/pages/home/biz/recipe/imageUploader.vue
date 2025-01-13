<script setup lang="ts">
import type { UploadProps } from 'element-plus';
import { useMessage } from '@/Hooks/message';
import { ref } from 'vue';

defineProps<{
	imageUrl: string
}>();

const emit = defineEmits<{
	(event: 'success', url: string): void;
}>();

const loading = ref(false);

const handleImageSuccess: UploadProps['onSuccess'] = (
	response,
	uploadFile
) => {
	loading.value = false;
	emit('success', response.image.url)
}

const handleUploadError = (error: any) => {
	loading.value = false;
	useMessage().error(JSON.parse(error.message).error.message);
}

const beforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
		useMessage().error('Image picture must be JPG/PNG format!')
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		useMessage().error('Image picture size can not exceed 2MB!')
		return false
	}
	loading.value = true;
	return true
}
</script>

<template>
	<el-upload class="image-uploader" action="/upload" :show-file-list="false" :on-success="handleImageSuccess"
		:on-error="handleUploadError" :before-upload="beforeImageUpload" name="source" v-loading="loading">
		<div v-if="imageUrl" class="image" :style="{ backgroundImage: `url(${imageUrl})` }" />
		<ImageUp v-else class="image-uploader-icon" />
	</el-upload>
</template>

<style scoped>
.image-uploader {
	width: 100%;
	height: 100%;
}

.image-uploader .image {
	width: 100%;
	height: 100%;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
</style>

<style>
.image-uploader .el-upload {
	width: 100%;
	height: 100%;
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.image-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.image-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>