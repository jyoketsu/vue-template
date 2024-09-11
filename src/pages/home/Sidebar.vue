<template>
  <div
    class="sidebar h-full relative flex-shrink-0 flex flex-col bg-neutral-50 dark:bg-zinc-700 border-r border-r-neutral-100 dark:border-r-zinc-700 transition-width duration-200 ease-in z-10"
    :class="isCollapsed ? 'w-0' : 'w-60'">
    <div class="content-wrapper absolute top-0 right-0 bottom-0 left-0 overflow-visible z-10">
      <div class="sidebar-content w-60 flex flex-col transition-all duration-200 ease-in bg-neutral-50 dark:bg-zinc-700"
        :class="{
          'translate-y-12 h-collapsed-menu-height shadow-xl border-r border-y dark:border-zinc-700 rounded-r-md': isCollapsed,
          'h-full': !isCollapsed,
          'opacity-100': isOpen,
          'opacity-0 -translate-x-[240px]': !isOpen && isCollapsed
        }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseOut">
        <div class="w-full h-11 flex-shrink-0 flex items-center px-4 space-x-1">
          <i class="size-[39px] bg-[url('/logo.svg')] bg-contain bg-center"></i>
          <span class="font-bold">Vue Template</span>
          <div class="flex-1"></div>
          <ChevronsLeftIcon v-if="!isCollapsed"
            class="size-5 text-zinc-400 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-50 hover:cursor-pointer transition-opacity duration-200 ease-in"
            :class="{ 'opacity-0': !hover }" @click="toggleCollapse" />
        </div>
        <div class="size-full overflow-auto">
          <el-menu router :default-active="$route.path" class="bg-transparent" @open="handleOpen" @close="handleClose">
            <MenuItem :menu-route-list="routes[0].children" />
          </el-menu>
        </div>
        <div class="w-full h-11 flex-shrink-0 flex items-center px-5">
          <span>Foot</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";
import { routes } from "@/router";
import { ChevronsLeftIcon } from "lucide-vue-next";
import { useCommonStore } from "@/stores/common";
import { storeToRefs } from "pinia";

const commonStore = useCommonStore();
const { isCollapsed, isOpen } = storeToRefs(commonStore);
const { toggleCollapse } = commonStore;
const hover = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleMouseEnter = () => {
  hover.value = true;
}

const handleMouseOut = () => {
  hover.value = false;
}
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
