<script setup lang="ts">
import { markRaw, reactive, ref, toRefs } from 'vue';
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.css'
import zhHans from 'bytemd/locales/zh_Hans.json'
import pluginGfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json"
import frontmatter from '@bytemd/plugin-frontmatter'
import mermaid from "@bytemd/plugin-mermaid"
import mediumZoom from '@bytemd/plugin-medium-zoom'
import breaks from '@bytemd/plugin-breaks'
import pluginMermaidZhHans from "@bytemd/plugin-mermaid/locales/zh_Hans.json"
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/atom-one-dark.min.css'
import { uploadImg } from '@/api/common';


const props = defineProps<{
	data: string;
}>();

const emit = defineEmits<{
	(e: 'update:data', value: string): void;
}>();

const pluginsList = [
	gfm({ locale: pluginGfmZhHans }),
	gemoji(),
	highlight(),
	frontmatter(),
	mediumZoom(),
	breaks(),
	mermaid({ locale: pluginMermaidZhHans }),
]

const state = reactive({
	value: props.data,
	plugins: markRaw(pluginsList),
	zh: zhHans,
})

const { value, plugins, zh } = toRefs(state)

const loading = ref(false)

const handleUploadFile = async (files: File[]) => {
	let fromData = new FormData()
	fromData.append('file', files[0])
	loading.value = true;
	const res: any = await uploadImg(files)
	loading.value = false;
	return [
		{
			title: files[0].name,
			url: res.image.url,
		},
	]
}

const handleChange = (value: string) => {
	state.value = value;
	emit('update:data', value);
}
</script>

<template>
	<div v-loding="loading">
		<Editor :value="value" :plugins="plugins" :locale="zhHans" :upload-images="handleUploadFile"
			@change="handleChange" />
	</div>
</template>

<style>
.bytemd {
	height: calc(100vh - 80px);
}

.dark .bytemd {
	color: var(--el-text-color-primary);
	background: var(--el-bg-color);
	border: var(--el-border-color);
}

.dark .bytemd-toolbar {
	background: var(--el-bg-color)
}

.dark .bytemd-toolbar-icon:hover {
	background-color: var(--el-border-color);
}

.dark .bytemd-status {
	border: var(--el-border-color);
}

.dark .CodeMirror {
	color: var(--el-text-color-primary);
	background: var(--el-bg-color);
}

.dark .cm-s-default .cm-header,
.dark .cm-link,
.dark .cm-s-default .cm-variable-2 {
	color: #9999ff
}
</style>