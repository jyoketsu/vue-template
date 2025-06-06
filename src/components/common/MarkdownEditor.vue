<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Vditor from 'vditor'
import "vditor/dist/index.css"
import 'juejin-markdown-themes/dist/juejin.min.css'

const props = defineProps<{
	data: string;
}>()

const emit = defineEmits<{
	(e: 'change', value: string): void;
}>();

onMounted(() => {
	const vditor = new Vditor('vditor', {
		mode: 'sv',
		theme: 'classic',
		minHeight: 240,
		lang: 'zh_CN',
		placeholder: '请输入内容...',
		counter: {
			enable: true,
			type: 'markdown'
		},
		preview: {
			delay: 0,
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
			emit('change', vditor.getValue())
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