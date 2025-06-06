<script setup lang="ts">
import type { UploadProps } from 'element-plus';
import { useMessage } from '@/Hooks/message';
import { ref } from 'vue';

type ImageMimeType =
	| 'image/jpeg'
	| 'image/png'
	| 'image/gif'
	| 'image/webp'
	| 'image/svg+xml';

interface UploadFileProps {
	imageUrl?: string;
	uploadFileUrl?: string; // 上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
	drag?: boolean; // 是否支持拖拽上传 ==> 非必传（默认为 true）
	disabled?: boolean; // 是否禁用上传组件 ==> 非必传（默认为 false）
	fileSize?: number; // 图片大小限制 ==> 非必传（默认为 5M）
	fileType?: ImageMimeType[]; // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
	height?: string; // 组件高度 ==> 非必传（默认为 150px）
	width?: string; // 组件宽度 ==> 非必传（默认为 150px）
	borderRadius?: string; // 组件边框圆角 ==> 非必传（默认为 8px）
	iconSize?: number;
}

// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps>(), {
	imageUrl: '',
	uploadFileUrl: '/upload',
	drag: true,
	disabled: false,
	fileSize: 5,
	fileType: () => ['image/jpeg', 'image/png', 'image/gif'],
	height: '150px',
	width: '150px',
	borderRadius: '8px',
	dir: '',
});

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
		:on-error="handleUploadError" :before-upload="beforeImageUpload" name="source" v-loading="loading"
		:accept="fileType.join(',')">
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