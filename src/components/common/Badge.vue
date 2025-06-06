<script setup lang="ts">
import Iconfont from './Iconfont.vue';

const props = defineProps<{
	type: string,
}>();
</script>

<template>

	<div class="flex items-center">
		<div class="size-[15px] rounded-full flex justify-center items-center"
			:class="{ 'bg-[var(--el-color-primary)]': type === '1', 'bg-[#ff962a]': type === '2' }">
			<Iconfont class="ml-[1px]" :icon="type === '1' ? 'select' : 'store'" color="white" size="9px" />
		</div>
		<div class="inner-curve -ml-[3px]"
			:class="{ 'bg-[var(--el-color-primary)]': type === '1', 'bg-[#ff962a]': type === '2' }"></div>
		<div class="relative h-[15px] text-white text-[10px] rounded-r-[15px] pr-[8px] pl-0 flex items-center text-nowrap"
			:class="{ 'bg-[var(--el-color-primary)]': type === '1', 'bg-[#ff962a]': type === '2' }">
			<div>{{ type === '1' ? '官方' : "优秀创作者" }}</div>
		</div>
	</div>

</template>

<style scoped>
.inner-curve {
	--r: 0px;
	/* control the rounded part */
	--s: 9px;
	/* control the size of the cut */
	--a: 30deg;
	/* control the depth of the curvature */
	--p: 50%;
	/* control the position */

	width: 10px;
	aspect-ratio: 2/3;
	/* background: var(--el-color-primary); */
	border-radius: var(--r);
	--_m: , #000 calc(100% - 1px), #0000;
	--_d: (var(--s) + var(--r))*cos(var(--a));
	mask:
		radial-gradient(var(--r) at var(--r) calc(var(--p) + var(--_d)) var(--_m)),
		radial-gradient(var(--r) at var(--r) calc(var(--p) - var(--_d)) var(--_m)),
		radial-gradient(var(--s) at calc(-1*sin(var(--a))*var(--s)) var(--p),
			#0000 100%, #000 calc(100% + 1px)) calc(var(--r)*(1 - sin(var(--a)))) 0 no-repeat,
		linear-gradient(#000 calc(var(--p) - var(--_d)), #0000 0 calc(var(--p) + var(--_d)), #000 0);
}
</style>
