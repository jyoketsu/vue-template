<script setup lang="ts">
import MarkdownEditor from '@/components/common/MarkdownEditor.vue';
import { ref } from 'vue';

const data = ref("# Hello World")
</script>

<template>
	<div>
		<MarkdownEditor :data="data" />
	</div>
</template>

<style scoped></style>
