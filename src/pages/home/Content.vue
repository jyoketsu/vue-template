<template>
  <div class="size-full overflow-hidden relative flex flex-col transition-all">
    <Header />
    <div class="flex-1 overflow-auto">
      <div class="p-4 max-w-screen-xl mx-auto">
        <router-view v-slot="{ Component, route }">
          <transition :enter-active-class="`animate__animated animate__fadeIn animate__faster`" mode="out-in">
            <!-- <keep-alive> -->
            <component :is="Component" />
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./Header.vue";

onMounted(() => {
  console.log("Home Page Mounted");
})
</script>
