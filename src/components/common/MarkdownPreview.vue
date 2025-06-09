<script setup lang="ts">
// @ts-ignore
import VditorPreview from 'vditor/dist/method.min';
import "vditor/dist/index.css"
import 'juejin-markdown-themes/dist/juejin.min.css'
import { onMounted, ref } from 'vue';
import { useDark } from '@vueuse/core';

const props = defineProps<{
	data: string;
}>()

const inited = ref(false);

const initPreview = (dark: boolean) => {
	VditorPreview.preview(document.getElementById("vditor-preview"), props.data, {
		theme: {
			current: dark ? 'dark' : 'light',
		}
	})
}

const isDark = useDark({
	onChanged(dark: boolean) {
		if (inited.value) {
			initPreview(dark)
		}
	},
})

onMounted(() => {
	initPreview(isDark.value);
	inited.value = true;
})
</script>

<template>
	<div class="vditor-preview" id="vditor-preview"></div>
</template>