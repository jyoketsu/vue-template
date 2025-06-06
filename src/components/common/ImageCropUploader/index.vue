<template>
	<div class="upload-box !border-none">
		<el-upload action="#" :id="uuid" class="px-0 py-0 border-none" :multiple="false" :disabled="self_disabled"
			:show-file-list="false" :http-request="handleHttpUpload" :drag="drag" :accept="fileType.join(',')"
			:auto-upload="false" :on-change="handleChange" v-loading="loading">
			<slot></slot>
		</el-upload>
		<Cropper :file="selectedFile" @close="selectedFile = null" @ok="handleUpload" />
	</div>
</template>

<script setup lang="ts" name="UploadImg">
import { ref, computed, inject } from 'vue';
import { ElNotification, formContextKey, formItemContextKey } from 'element-plus';
import type { UploadProps, } from 'element-plus';
import { guid } from '@/utils/util';
import { request } from '@/api/index';
import type { UploadInstance } from 'element-plus';
import Cropper from './Cropper.vue';

type ImageMimeType =
	| 'image/jpeg'
	| 'image/png'
	| 'image/gif'
	| 'image/webp'
	| 'image/svg+xml';

interface UploadFileProps {
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

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
interface UploadEmits {
	(e: 'update:imageUrl', value: string): void;
}
const emit = defineEmits<UploadEmits>();

// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps>(), {
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

const loading = ref(false);

// 生成组件唯一id
const uuid = ref('id-' + guid());

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
	return props.disabled || formContext?.disabled;
});
const selectedFile = ref<File | null>(null);

const handleHttpUpload = async (file: File) => {
	let formData = new FormData();
	formData.append('source', file);
	try {
		const res: any = await request.post(props.uploadFileUrl, formData,);
		uploadSuccess();
		emit('update:imageUrl', res.image.url);
		// 调用 el-form 内部的校验方法（可自动校验）
		formItemContext?.prop && formContext?.validateField([formItemContext.prop as string]);
	} catch (error) {
		uploadError();
	}
};

const base64ToFile = (base64: string, filename: string) => {
	const arr = base64.split(',');
	const mime = arr[0].match(/:(.*?);/)![1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
};

const handleUpload = async (base64: string) => {
	// 将 base64 转换为 File 对象
	const file = base64ToFile(base64, 'avatar.png');
	// 上传文件
	handleHttpUpload(file);
	selectedFile.value = null;
}

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
	loading.value = true;
	const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
	const imgType = props.fileType.includes(rawFile.type as ImageMimeType);
	if (!imgType)
		ElNotification({
			title: '温馨提示',
			message: '上传图片不符合所需的格式！',
			type: 'warning',
		});
	if (!imgSize)
		setTimeout(() => {
			ElNotification({
				title: '温馨提示',
				message: `上传图片大小不能超过 ${props.fileSize}M！`,
				type: 'warning',
			});
		}, 0);
	return imgType && imgSize;
};

/**
 * @description 图片上传成功
 * */
const uploadSuccess = () => {
	loading.value = false;
	ElNotification({
		title: '温馨提示',
		message: '图片上传成功！',
		type: 'success',
	});
};

/**
 * @description 图片上传错误
 * */
const uploadError = () => {
	loading.value = false;
	ElNotification({
		title: '温馨提示',
		message: '图片上传失败，请您重新上传！',
		type: 'error',
	});
};

const handleChange = (file: any) => {
	const rawFile = file.raw;
	beforeUpload(rawFile);
	selectedFile.value = rawFile;
}
</script>
