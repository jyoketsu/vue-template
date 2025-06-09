<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Vditor from 'vditor'
import "vditor/dist/index.css"
import { useDark } from '@vueuse/core';
import 'juejin-markdown-themes/dist/juejin.min.css'

const props = defineProps<{
	data: string;
}>()

const emit = defineEmits<{
	(e: 'change', value: string): void;
}>();

const vditorInstance = ref<Vditor>()

const isDark = useDark({
	onChanged(dark: boolean) {
		// update the dom, call the API or something
		if (vditorInstance.value) {
			// 更新主题色
			// https://ld246.com/article/1549638745630#API
			vditorInstance.value.setTheme(dark ? 'dark' : 'classic', dark ? 'dark' : 'classic')
		}
	},
})

onMounted(() => {
	vditorInstance.value = new Vditor('vditor', {
		mode: 'sv',
		theme: isDark.value ? 'dark' : 'classic',
		minHeight: 240,
		lang: 'zh_CN',
		placeholder: '请输入内容...',
		counter: {
			enable: true,
			type: 'markdown'
		},
		preview: {
			delay: 0,
			theme: { current: isDark.value ? 'dark' : 'classic' },
			hljs: {
				style: 'monokai',
				lineNumber: true
			}
		},
		tab: '\t',
		typewriterMode: true,
		toolbarConfig: {
			pin: true
		},
		cache: {
			enable: false
		},
		toolbar: [
			'emoji',
			'headings',
			'bold',
			'italic',
			'strike',
			'link',
			'|',
			'list',
			'ordered-list',
			'check',
			'outdent',
			'indent',
			'|',
			'quote',
			'line',
			'code',
			'inline-code',
			'insert-before',
			'insert-after',
			'|',
			'table',
			'|',
			'undo',
			'redo',
			'|',
			'edit-mode',
			'code-theme',
			'fullscreen',
			{
				name: 'more',
				toolbar: [
					'export',

					'both',
					'preview',
					'info',
					'help',
				],
			}],
		value: props.data,
		blur: () => {
			emit('change', vditorInstance.value!.getValue())
		}
	})

})
</script>

<template>
	<div id="vditor"></div>
</template>



<style>
.vditor-preview__action {
	display: none;
}
</style>