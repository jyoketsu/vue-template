<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	items: {
		label: string;
		name: string;
	}[];
	activeName: string;
	itemWidth: number;
	fontSize: string;
	borderBarHeight: string;
	activeFontWeight: string;
}>()

const emit = defineEmits<{
	(e: 'click', name: string): void;
}>()

const activeIndex = computed(() => {
	return props.items.findIndex(item => item.name === props.activeName);
})
</script>

<template>
	<div class="relative h-full">
		<div class="relative h-full flex items-center text-inherit space-x-[45px]" :style="`font-size:${fontSize}`">
			<div v-for="(item, index) in items"
				class="relative h-full cursor-pointer flex justify-center items-center hover:!text-[var(--el-color-primary)]"
				:key="index"
				:style="`width:${itemWidth}px; color:${activeIndex === index ? 'var(--el-color-primary)' : 'inherit'}; font-weight:${activeIndex === index ? activeFontWeight || 400 : 'normal'}`"
				@click="emit('click', item.name)">
				{{ item.label }}
			</div>
		</div>
		<div v-if="activeIndex >= 0"
			class="absolute bottom-0 left-0 bg-gradient-to-r from-[#4FD453] to-[#0EA1FF] !transition-transform"
			:style="`width:${itemWidth}px; height: ${borderBarHeight || '2px'}; transform: translateX(${activeIndex * (itemWidth + 50)}px)`" />
	</div>
</template>