<template>
	<div class="size-full overflow-hidden">
		<vue-gantt :data="data" start-date="2024-09-23" end-date="2025-09-23" />
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const data = reactive([
	{
		name: "Xu Quan",
		projects: [
			{ name: "Project 1", startDate: "2024-09-24", endDate: "2024-09-30" },
			{ name: "Project 2", startDate: "2024-10-01", endDate: "2024-10-02" },
			{ name: "Project 3", startDate: "2024-10-03", endDate: "2024-10-15" },
		],
	},
	{
		name: "Lei Yufei",
		projects: [
			{ name: "Project 1", startDate: "2024-10-05", endDate: "2024-10-28" },
			{ name: "Project 2", startDate: "2024-12-12", endDate: "2025-01-09" },
			{ name: "Project 3", startDate: "2025-02-01", endDate: "2025-02-27" },
		],
	},
]);
</script>
