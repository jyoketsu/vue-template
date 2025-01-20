<template>
  <div class="size-full overflow-hidden relative flex flex-col transition-all">
    <Header />
    <div class="flex-1 overflow-auto p-4">
      <router-view v-slot="{ Component, route }">
        <transition :enter-active-class="`animate__animated animate__fadeIn animate__faster`" mode="out-in">
          <!-- <keep-alive> -->
          <component :is="Component" :key="route.path" />
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "./Header.vue";
</script>
