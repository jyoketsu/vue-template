<script setup lang="ts">
const props = defineProps<{
	icon: string;
	size?: string;
	color?: string;
	isSymbol?: boolean;
}>();
</script>

<template>
	<svg v-if="isSymbol" class="icon"
		:style="`width: ${size || '14px'}; height: ${size || '14px'}; fill: ${color || 'currentColor'}`" aria-hidden="true">
		<use :xlink:href="`#icon-${icon}`"></use>
	</svg>
	<i v-else class="iconfont" :class="`icon-${icon}`" :style="`font-size: ${size}; color: ${color || 'inherit'}`"></i>
</template>

<style>
.icon {
	vertical-align: -0.15em;
	overflow: hidden;
}
</style>