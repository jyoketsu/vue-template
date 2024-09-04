<template>
  <div
    class="w-60 h-full flex-shrink-0 flex flex-col overflow-hidden bg-neutral-50 dark:bg-zinc-700 border-r border-r-neutral-100 dark:border-r-zinc-700"
  >
    <div class="w-full h-11 flex-shrink-0 flex items-center px-5 space-x-2">
      <i class="size-[39px] bg-[url('/logo.svg')] bg-contain bg-center"></i>
      <span class="font-bold">Vue Template</span>
    </div>
    <div class="size-full overflow-auto">
      <el-menu
        router
        class="bg-transparent"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <MenuItem :menu-route-list="routes[0].children" />
      </el-menu>
    </div>
    <div class="w-full h-11 flex-shrink-0 flex items-center px-5">
      <span>Foot</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";
import { routes } from "@/router";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.el-menu {
  background-color: transparent !important;
  border-right: none !important;
}
.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color) !important;
}
.el-menu-item {
  margin-bottom: 5px;
}
</style>
