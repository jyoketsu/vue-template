<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in routesComputed" v-show="item.meta.title" :key="index"
				:to="{ path: item.path }">
				{{ item.meta.title ? $t(`router.${item.meta.title}`) : '' }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const routesComputed = computed(() => route.matched)
</script>