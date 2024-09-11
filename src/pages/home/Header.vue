<template>
  <div class="w-full h-11 flex-shrink-0 flex items-center px-4 space-x-2">
    <div v-if="isCollapsed" class="text-zinc-700 hover:cursor-pointer" @click="toggleCollapse">
      <ChevronsRightIcon v-if="isOpen" class="size-5" />
      <MenuIcon v-else class="size-5" />
    </div>
    <span>Head</span>
    <span class="flex-1 flex-shrink-0"></span>
    <el-switch v-model="isDark" :active-action-icon="MoonIcon" :inactive-action-icon="SunIcon" @change="toggleDark" />
    <el-select v-model="currentLocale" @change="(val: string) => changeLocale(val)"
      style="width: 100px; margin-right: 8px">
      <el-option label="简体中文" value="zh-CN" />
      <el-option label="繁體中文" value="zh-TW" />
    </el-select>
    <el-button type="primary" @click="loginOut">退出登录</el-button>
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { useDark, useToggle } from "@vueuse/core";
import { messageBox } from "@/Hooks/Element-plus";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { MenuIcon, ChevronsRightIcon } from "lucide-vue-next";

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore();
const authStore = useAuthStore();
const { currentLocale, isCollapsed, isOpen } = storeToRefs(commonStore);
const { setLocale, toggleCollapse } = commonStore;
const isDark = useDark();
const toggleDark = useToggle(isDark);


function changeLocale(type: string) {
  locale.value = type;
  setLocale(type);
}

// 退出登录
const loginOut = async () => {
  await messageBox("提示", "您确定要退出登录吗？", "primary")
  authStore.logout()
  router.push({
    path: "/login",
    query: {
      url: route.path,
    },
  })
}
</script>
