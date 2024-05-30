import { User } from "@/interface/User";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const currentLocale = ref("zh-CN");

  function setLocale(value: string) {
    currentLocale.value = value;
  }

  return { currentLocale, setLocale };
});
