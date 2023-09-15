<template>
  <div class="head">
    <IconButton
      :icon="isCollapse ? 'mdi:menu-close' : 'mdi:menu-open'"
      :icon-width="28"
      type="text"
      text
      @click="emit('clickCollapse')"
    />
    <span class="space"></span>
    <el-select
      v-model="currentLocale"
      @change="(val:string) => changeLocale(val)"
      style="width: 100px; margin-right: 8px"
    >
      <el-option label="简体中文" value="zh-CN" />
      <el-option label="繁體中文" value="zh-TW" />
      <el-option label="English" value="en" />
    </el-select>

    <IconButton
      icon="mdi:theme-light-dark"
      :icon-width="28"
      type="text"
      text
      @click="toggleDark"
    />
    <IconButton
      icon="mdi:logout"
      :icon-width="28"
      type="text"
      text
      @click="handleLogout"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import setDark from "../../utils/dark";
import IconButton from "../../components/IconButton.vue";

defineProps<{
  isCollapse: boolean;
}>();

const emit = defineEmits<{
  (e: "clickCollapse"): void;
}>();

const { locale } = useI18n();
const store = useStore();
const router = useRouter();
const currentLocale = computed(() => store.state.common.locale);
const isDark = computed(() => store.state.common.dark);

function changeLocale(type: string) {
  locale.value = type;
  store.dispatch("common/changeLocale", type);
}

function toggleDark() {
  setDark(!isDark.value);
}
function handleLogout() {
  store.dispatch("auth/logout");
}
</script>
<style scoped>
.head {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--el-border-color);
}
.space {
  flex: 1;
}
.page-button {
  margin: 0 5px;
  color: var(--el-text-color-primary);
  cursor: pointer;
}
</style>
