<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
	console.log('biz page mounted');
})
</script>

<template>
	<div class="size-full overflow-hidden">
		<router-view></router-view>
	</div>
</template>
