<template>
  <div class="size-full overflow-hidden relative flex flex-col">
    <Header />
    <div class="flex-1 overflow-auto">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
</script>
