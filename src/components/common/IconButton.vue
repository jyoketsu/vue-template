<template>
  <el-button
    :size="size"
    :type="type"
    :text="text"
    :style="style"
    @click="(e:MouseEvent) => emit('click', e)"
  >
    <Icon :icon="icon" :width="iconWidth" :height="iconHeight" />
    <span v-if="title" class="title" :style="`font-size: ${fontSize}`">{{
      title
    }}</span>
  </el-button>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
  size?: "large" | "default" | "small";
  fontSize?: number;
  title?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info" | "text";
  text?: boolean;
  style?: Object;
}>();

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>
<style scoped>
.title {
  margin-left: 8px;
  color: inherit;
}
</style>
