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
    <el-card class="!overflow-visible">
      <template #header>
        <div class="card-header">
          <span>{{ $t("dashboard.techStack") }}</span>
        </div>
      </template>
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div v-for="(tech, index) in techStackList" :key="index"
          class="border dark:border-zinc-700 rounded-md p-4 cursor-pointer" @click="openLink(tech.link)">
          <div class="flex items-center space-x-2 mb-2">
            <img :src="tech.icon" class="inline w-12 h-12" />
            <span class="text-xl font-bold">{{ tech.title }}</span>
          </div>
          <div class="text-sm">{{ tech.describtion }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { getLocationInfo, getWeatherInfo } from "@/api/publicApi";
import { useAuthStore } from "@/stores/auth";
import { useDark } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { t } = useI18n();
const isDark = useDark();
const greeting = ref('');
const weatherInfo = ref<{ city: string; province: string; weather: string; temperature: string } | null>(null);

const techStackList = computed(() => [{
  title: 'Vue',
  icon: '/logo.svg',
  describtion: t('dashboard.vueDesc'),
  link: 'https://vuejs.org/'
}, {
  title: 'TypeScript',
  icon: '/icons/typescript.svg',
  describtion: t('dashboard.tsDesc'),
  link: 'https://www.typescriptlang.org/'
}, {
  title: 'Vite',
  icon: '/icons/vite.svg',
  describtion: t('dashboard.viteDesc'),
  link: 'https://vitejs.dev/'
}, {
  title: 'Pinia',
  icon: '/icons/pinia.svg',
  describtion: t('dashboard.piniaDesc'),
  link: 'https://pinia.vuejs.org/'
}, {
  title: 'Element Plus',
  icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1kbcgUZQKvVkE5pcMTzAIimE41upKJShsQ&s',
  describtion: t('dashboard.elementDesc'),
  link: 'https://element-plus.org/'
}, {
  title: 'Tailwindcss',
  icon: '/icons/tailwind.svg',
  describtion: t('dashboard.tailwindDesc'),
  link: 'https://tailwindcss.com/'
}, {
  title: 'Lucide',
  icon: isDark.value ? 'https://lucide.dev/logo.dark.svg' : 'https://lucide.dev/logo.light.svg',
  describtion: t('dashboard.lucideDesc'),
  link: 'https://lucide.dev/'
}, {
  title: 'Vue I18n',
  icon: 'https://kazupon.github.io/vue-i18n/vue-i18n-logo.png',
  describtion: t('dashboard.i18nDesc'),
  link: 'https://kazupon.github.io/vue-i18n/'
}])

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

const openLink = (url: string) => {
  window.open(url, "_blank");
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
