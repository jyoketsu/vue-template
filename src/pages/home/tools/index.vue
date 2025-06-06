<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LanguagesIcon, MoonIcon, SunIcon, MenuIcon, ChevronsRightIcon, ImageUpIcon } from "lucide-vue-next";
import useClipboard from 'vue-clipboard3'
import { useMessage } from '@/Hooks/message';
import Iconfont from '@/components/common/Iconfont.vue';
import Badge from '@/components/common/Badge.vue';
import ImageCropUploader from '@/components/common/ImageCropUploader/index.vue';
import ImageUploader from '@/components/common/ImageUploader.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { toClipboard } = useClipboard()
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const paths = [{
	label: '镜像',
	name: '/images',
}, {
	label: '模型',
	name: '/models',
}];

const currentPath = ref('/images');

const tabs = [{
	label: '全部',
	name: 'all'
}, {
	label: "镜像",
	name: 'image',
}, {
	label: '模型',
	name: 'model'
}];

const currentTab = ref('all');

const gridClass = "size-full border border-[var(--el-border-color)] rounded-md flex flex-col justify-center items-center p-4 space-y-4"

const handleCopy2Clipboard = async () => {
	try {
		await toClipboard("Any text you like")
		useMessage().success("已复制到剪贴板")
	} catch (e) {
		console.error(e)
	}
}

const avatar = ref(user.value?.avatar);
const image = ref(user.value?.avatar || '')
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

		<div :class="gridClass">
			<p>Lucide</p>
			<div class="flex gap-2">
				<LanguagesIcon class="size-5" />
				<MoonIcon class="size-5" />
				<SunIcon class="size-5" />
				<MenuIcon class="size-5" />
				<ChevronsRightIcon class="size-5" />
			</div>
			<el-link href="https://lucide.dev/icons/" target="_blank">https://lucide.dev/icons/</el-link>
		</div>

		<div :class="gridClass">
			<p>Iconfont</p>
			<div class="flex gap-2">
				<Iconfont icon="github" size="23px" />
				<Iconfont icon="icon-27" size="23px" />
				<Iconfont icon="icon-17" size="23px" />
				<Iconfont icon="icon-21" size="23px" />
			</div>
		</div>

		<div :class="gridClass">
			<p>Tab导航</p>
			<div class="h-[45px] border-b border-[var(--el-border-color)]">
				<TabNav :items="paths" :itemWidth="50" fontSize="16px" :activeName="currentPath"
					@click="(name: string) => currentPath = name" />
			</div>
		</div>

		<div :class="gridClass">
			<p>Tab</p>
			<Tab :items="tabs" :active-name="currentTab" @click="(name: string) => currentTab = name" />
		</div>

		<div :class="gridClass">
			<p>内凹效果</p>
			<div class="flex gap-2">
				<Badge type="1" />
				<Badge type="2" />
			</div>
			<div class="flex items-center">
				<p class="text-xs">其他形状：</p>
				<el-link href="https://css-shape.com/" target="_blank">https://css-shape.com/</el-link>
			</div>
		</div>

		<div :class="gridClass">
			<p>复制到剪贴板</p>
			<el-button @click="handleCopy2Clipboard">复制</el-button>
		</div>


		<div :class="gridClass">
			<p>图片上传</p>
			<div class="size-[92px]">
				<ImageUploader :image-url="image" @success="(url: string) => image = url" />
			</div>
		</div>

		<div :class="gridClass">
			<p>图片裁剪并上传</p>

			<div class="relative size-[92px] rounded-full overflow-hidden border border-[#E2E4E7]">
				<el-avatar :size="92" :src="avatar" />
				<ImageCropUploader class="upload-avatar absolute left-0 bottom-0 w-full h-[30.5px]"
					@update:image-url="(val) => avatar = val">
					<div
						class="absolute size-full top-0 left-0  bg-black/50 !text-white flex justify-center items-center cursor-pointer">
						<ImageUpIcon class="size-5" />
					</div>
				</ImageCropUploader>
			</div>

		</div>

		<div :class="gridClass">
			<p>图片懒加载</p>
			<div class="w-full h-[200px]">
				<img v-lazy="`/images/6c7dfd47.jpeg`" class="size-full object-cover" />
			</div>
		</div>

	</div>
</template>

<style>
.upload-avatar .el-upload-dragger {
	background-color: unset;
	border: unset;
	position: unset;
}
</style>
