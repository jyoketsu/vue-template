<template>
  <div
    v-loading="loading"
    :style="{ width, height, pointerEvents: readonly ? 'none' : 'unset' }"
  >
    <iframe
      className="web-view"
      :src="src"
      frameBorder="0"
      allowFullScreen
      :width="width"
      :height="height"
      @load="loading = false"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  src: string;
  width: string;
  height: string;
  readonly?: boolean;
}>();
const loading = ref(true);
</script>
<style scoped lang="scss"></style>
