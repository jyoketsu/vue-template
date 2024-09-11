<template>
  <div class="home size-full flex bg-white dark:bg-zinc-800" @mousemove="handleMouseMove">
    <Sidebar />
    <Content />
  </div>
</template>
<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { useCommonStore } from "@/stores/common";
import { storeToRefs } from "pinia";
import Sidebar from "./Sidebar.vue";
import Content from "./Content.vue";

const commonStore = useCommonStore();
const { isCollapsed, isOpen } = storeToRefs(commonStore);
const { toggleOpen } = commonStore

let lastX = 0;
let movedLeft = false;

const handleMouseMove = useThrottleFn((event: MouseEvent) => {
  if (!isCollapsed.value) return;
  const currentX = event.clientX;

  // 判断鼠标移动方向
  if (currentX < lastX) {
    // 鼠标从右往左移动
    movedLeft = true;

    if (currentX <= 30 && !isOpen.value) {
      toggleOpen(true);
    }
  } else if (currentX > lastX) {
    // 鼠标从左往右移动
    movedLeft = false;

    if (currentX > 240 && isOpen.value) {
      toggleOpen(false);
    }
  }

  // 更新上一次的鼠标X坐标
  lastX = currentX;
}, 100)
</script>
<style scoped></style>
