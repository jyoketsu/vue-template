<template>
  <el-menu
    router
    :default-active="defaultActive"
    class="el-menu-vertical"
    :collapse="isCollapse"
  >
    <el-menu-item index="dashboard">
      <Icon icon="mdi:home" width="23" />
      <span>{{ $t("menu.dashboard") }}</span>
    </el-menu-item>
    <el-menu-item index="user">
      <Icon icon="mdi:account-details" width="23" />
      <template #title>{{ $t("menu.user") }}</template>
    </el-menu-item>
    <el-menu-item index="ingredient">
      <Icon icon="mdi:food-steak" width="23" />
      <template #title>{{ $t("menu.ingredient") }}</template>
    </el-menu-item>
    <el-menu-item index="recipe">
      <Icon icon="mdi:silverware" width="23" />
      <template #title>{{ $t("menu.recipe") }}</template>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

defineProps<{
  isCollapse: boolean;
}>();

const route = useRoute();
const defaultActive = ref("");

onMounted(() => {
  const matches = route.path.match(/\/([^/]+)/);
  if (matches) {
    defaultActive.value = matches[1];
  }
});
</script>
<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style scoped>
.el-menu-vertical {
  height: 100%;
}
.el-menu-vertical:not(.el-menu--collapse) .iconify--mdi {
  margin-right: 8px;
}
</style>
