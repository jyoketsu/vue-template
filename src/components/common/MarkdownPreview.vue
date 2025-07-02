<script setup lang="ts">
import { Viewer } from '@bytemd/vue-next'
import { markRaw, reactive, toRefs, } from 'vue';
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.css'
import frontmatter from '@bytemd/plugin-frontmatter'
import theme from 'bytemd-plugin-theme'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import breaks from '@bytemd/plugin-breaks'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'

const props = defineProps<{
	data: string;
}>();

const emit = defineEmits<{
	(e: 'update:data', value: string): void;
}>();

const pluginsList = [
	gfm(),
	gemoji(),
	highlight(),
	frontmatter(),
	mediumZoom(),
	breaks(),
	theme(),
]

const state = reactive({
	value: props.data,
	plugins: markRaw(pluginsList),
})

const { value, plugins, } = toRefs(state)
</script>

<template>
	<div class="markdown-preview">
		<Viewer :value="value" :plugins="plugins" />
	</div>
</template>

<style>
.markdown-preview .markdown-body {
	padding: 32px;
}
</style>