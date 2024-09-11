import { User } from "@/interface/User";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const currentLocale = ref("zh-CN");
  const isCollapsed = ref(false);
  const isOpen = ref(false);

  function setLocale(value: string) {
    currentLocale.value = value;
  }

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
  }

  function toggleOpen(open: boolean) {
    isOpen.value = open;
  }

  return {
    currentLocale,
    setLocale,
    isCollapsed,
    toggleCollapse,
    isOpen,
    toggleOpen,
  };
});
