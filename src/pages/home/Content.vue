<template>
  <div class="size-full overflow-auto relative">
    <Header />
    <div class="size-full flex flex-col">
      <div class="w-full h-11 flex-shrink-0"></div>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
</script>
