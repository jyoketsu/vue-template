<template>
  <div class="w-full h-11 flex-shrink-0 flex items-center px-4 space-x-4 select-none">
    <div v-if="isCollapsed" class="hover:cursor-pointer" @click="toggleCollapse">
      <ChevronsRightIcon v-if="isOpen" class="size-5" />
      <MenuIcon v-else class="size-5" />
    </div>
    <breadcrumb />
    <span class="flex-1 flex-shrink-0"></span>
    <el-switch v-model="isDark" :active-action-icon="MoonIcon" :inactive-action-icon="SunIcon" @change="toggleDark" />
    <el-dropdown>
      <LanguagesIcon class="size-5" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changeLocale('zh-CN')">简体中文</el-dropdown-item>
          <el-dropdown-item @click="changeLocale('zh-TW')">繁體中文</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <div class="h-full flex items-center space-x-1">
        <el-avatar :size="28" :src="user?.avatar">{{ user?.username?.substring(0, 1) }}</el-avatar>
        <span>{{ user?.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="optionsVisible = true">{{ $t('common.options') }}</el-dropdown-item>
          <el-dropdown-item @click="loginOut">{{ $t('common.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <Options :visible="optionsVisible" @close="optionsVisible = false" />
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/common";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { LanguagesIcon, MoonIcon, SunIcon } from "lucide-vue-next";
import { useDark, useToggle } from "@vueuse/core";
import { messageBox } from "@/Hooks/Element-plus";
import { useRoute, useRouter } from "vue-router";
import { MenuIcon, ChevronsRightIcon } from "lucide-vue-next";
import Breadcrumb from './Breadcrumb.vue'
import { ref } from "vue";
import Options from './options/index.vue';

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { isCollapsed, isOpen } = storeToRefs(commonStore);
const { setLocale, toggleCollapse } = commonStore;
const isDark = useDark();
const toggleDark = useToggle(isDark);
const { t } = useI18n();
const optionsVisible = ref(false);


function changeLocale(type: string) {
  locale.value = type;
  setLocale(type);
}

// 退出登录
const loginOut = async () => {
  await messageBox(t("common.tip"), t("common.logoutConfirm"), "primary")
  await authStore.logout()
  router.push({
    path: "/login",
    query: {
      url: route.path,
    },
  })
}
</script>
