<template>
  <div class="home size-full flex bg-white dark:bg-zinc-800">
    <Sidebar />
    <Content />
  </div>
</template>
<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Content from "./Content.vue";
</script>
<style scoped></style>
