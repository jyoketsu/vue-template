<template>
  <el-menu
    default-active="2"
    class="bg-transparent"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="dashboard">
      <template #title>
        <LayoutDashboardIcon class="size-5 mr-2" />
        <span>{{ $t("router.dashboard") }}</span>
      </template>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="ingredient">
      <CarrotIcon class="size-5 mr-2" />
      <template #title>{{ $t("router.ingredient") }}</template>
    </el-menu-item>
    <el-menu-item index="recipe">
      <FileTextIcon class="size-5 mr-2" />
      <template #title>{{ $t("router.recipe") }}</template>
    </el-menu-item>
    <el-menu-item index="user">
      <UsersIcon class="size-5 mr-2" />
      <template #title>{{ $t("router.user") }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import {
  CarrotIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  UsersIcon,
} from "lucide-vue-next";

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
</style>
