<template>
  <el-button :size="size" :type="type" :text="text" @click="emit('click')">
    <Icon :icon="icon" :width="iconWidth" :height="iconHeight" />
    <span v-if="title">{{ title }}</span>
  </el-button>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
  size?: "large" | "default" | "small";
  title?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info" | "text";
  text?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>
<style scoped></style>
