<script setup lang="ts">
import { onMounted, ref } from 'vue';

const paths = [{
	label: '镜像',
	name: '/images',
}, {
	label: '模型',
	name: '/models',
}];

const currentPath = ref('/images');

const tabs = [{
	label: '全部',
	name: 'all'
}, {
	label: "镜像",
	name: 'image',
}, {
	label: '模型',
	name: 'model'
}];

const currentTab = ref('all');

const gridClass = "size-full border border-[var(--el-border-color)] rounded-md flex flex-col justify-center items-center p-4 space-y-4"
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

		<div :class="gridClass">
			<p>Tab导航</p>
			<div class="h-[45px] border-b border-[var(--el-border-color)]">
				<TabNav :items="paths" :itemWidth="50" fontSize="16px" :activeName="currentPath"
					@click="(name: string) => currentPath = name" />
			</div>
		</div>
		<div :class="gridClass">
			<p>Tab</p>
			<Tab :items="tabs" :active-name="currentTab" @click="(name: string) => currentTab = name" />
		</div>
	</div>
</template>
