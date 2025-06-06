<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	items: {
		label: string;
		name: string;
	}[];
	activeName: string;
	itemWidth?: number;
	fontSize?: string;
}>()

const emit = defineEmits<{
	(e: 'click', name: string): void;
}>()

const activeIndex = computed(() => {
	return props.items.findIndex(item => item.name === props.activeName);
})
</script>

<template>
	<div class="relative h-[30px] leading-[30px] bg-[#F7FAF9] rounded-[15px] overflow-hidden">
		<div v-if="activeIndex >= 0"
			class="absolute bottom-0 left-0 bg-[var(--el-color-primary)] h-full rounded-[15px] !transition-transform"
			:style="`width:${itemWidth || 60}px; transform: translateX(${activeIndex * ((itemWidth || 60))}px)`" />

		<div class="relative h-full flex items-center text-[#9FA5B0]" :style="`font-size:${fontSize || '14px'};`">
			<div v-for="(item, index) in items"
				class="h-full cursor-pointer flex justify-center items-center hover:!text-[var(--el-color-primary)]"
				:key="index"
				:style="`width:${itemWidth || 60}px; color:${activeIndex === index ? 'white' : '#9FA5B0'}; pointer-events:${activeIndex === index ? 'none' : 'auto'};`"
				@click="emit('click', item.name)">
				{{ item.label }}
			</div>
		</div>
	</div>
</template>