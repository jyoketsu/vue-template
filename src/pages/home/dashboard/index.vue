<template>
  <div class="w-full flex flex-col space-y-3">
    <el-card class="flex-shrink-0">
      <div class="flex items-center space-x-4">
        <el-avatar :size="50" :src="user?.avatar" />
        <div class="space-y-1">
          <div class="text-xl font-bold">{{ `${$t(`dashboard.${greeting}`)}，${user?.username}` }}</div>
          <div class="text-zinc-500 dark:text-zinc-400">{{ weatherInfo ? $t('dashboard.weather', {
            ...weatherInfo
          }) : $t('dashboard.weatherLoading') }}</div>
        </div>
      </div>
    </el-card>
    <TechStacks :title="$t('dashboard.frontendTechStack')" :tech-stack-list="frontendTechStackList" />
    <TechStacks :title="$t('dashboard.backendTechStack')" :tech-stack-list="backendTechStackList" />
  </div>
</template>
<script setup lang="ts">
import { getLocationInfo, getWeatherInfo } from "@/api/publicApi";
import { useAuthStore } from "@/stores/auth";
import { useDark } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import TechStacks from "./TechStacks.vue";
import { useTechStack } from "./useTechStack";

const { frontendTechStackList, backendTechStackList } = useTechStack();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { t } = useI18n();
const isDark = useDark();
const greeting = ref('');
const weatherInfo = ref<{ city: string; province: string; weather: string; temperature: string } | null>(null);

const getGreeting = () => {
  // 获取当前时间的小时数
  const hour = new Date().getHours();

  // 根据小时数返回问候语
  if (hour >= 5 && hour < 12) {
    return 'am';
  } else if (hour >= 12 && hour < 18) {
    return 'pm';
  } else {
    return 'evening';
  }
}

onMounted(async () => {
  greeting.value = getGreeting();
  const res: any = await getLocationInfo();
  if (res.status === '1') {
    const weather: any = await getWeatherInfo(res.adcode);
    if (weather.status === '1' && weather.lives.length) {
      weatherInfo.value = weather.lives[0];
    }
  }
})
</script>
<style scoped></style>
