<script setup lang="ts">
defineProps<{
	title: string;
	techStackList: { title: string; icon: string; describtion: string; link: string }[];
}>();

const openLink = (url: string) => {
	window.open(url, "_blank");
}
</script>

<template>
	<el-card class="!overflow-visible">
		<template #header>
			<div class="card-header">
				<span>{{ title }}</span>
			</div>
		</template>
		<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
			<div v-for="(tech, index) in techStackList" :key="index"
				class="border dark:border-zinc-700 rounded-md p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
				@click="openLink(tech.link)">
				<div class="flex items-center space-x-2 mb-2">
					<img :src="tech.icon" class="inline w-12 h-12" />
					<span class="text-xl font-bold">{{ tech.title }}</span>
				</div>
				<div class="text-sm">{{ tech.describtion }}</div>
			</div>
		</div>
	</el-card>
</template>