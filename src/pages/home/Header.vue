<template>
  <div
    class="w-full h-11 fixed left-60 top-0 bg-white dark:bg-zinc-700 bg-opacity-60 backdrop-blur-md z-50 flex items-center px-[16px] space-x-2 border-b dark:border-b-zinc-700"
  >
    <span>Head</span>
    <span class="flex-1"></span>
    <el-switch
      v-model="isDark"
      :active-action-icon="MoonIcon"
      :inactive-action-icon="SunIcon"
      @change="toggleDark"
    />
    <el-select
      v-model="currentLocale"
      @change="(val:string) => changeLocale(val)"
      style="width: 100px; margin-right: 8px"
    >
      <el-option label="简体中文" value="zh-CN" />
      <el-option label="繁體中文" value="zh-TW" />
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { useDark, useToggle } from "@vueuse/core";

const { locale } = useI18n();
const store = useCommonStore();
const { currentLocale } = storeToRefs(store);
const { setLocale } = store;
const isDark = useDark();
const toggleDark = useToggle(isDark);

function changeLocale(type: string) {
  locale.value = type;
  setLocale(type);
}
</script>
