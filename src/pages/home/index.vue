<template>
  <div class="home size-full min-h-screen flex bg-zinc-100 dark:bg-zinc-800">
    <div class="w-[256px]">
      <div class="menu-container fixed top-[56px] left-0 w-[256px] border-r dark:border-r-zinc-700">
        <LeftMenu />
      </div>
    </div>
    <div class="flex-1">
      <Header />
      <div class="size-full flex flex-col">
        <div class="w-full h-[56px]"></div>
        <div class="flex-1">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
import LeftMenu from "./LeftMenu.vue";
</script>
<style scoped>
.menu-container {
  height: calc(100vh - 56px);
}
</style>
