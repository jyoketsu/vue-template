<template>
  <div class="home">
    <div class="left">
      <div class="logo">
        <i
          class="icon-logo"
          :style="`margin-right: ${isCollapse ? 0 : 8}px;`"
        />
        <i
          v-if="!isCollapse"
          class="icon-text"
          :style="`background-image: url('logo-title${
            isDark ? `-dark` : ``
          }.png');`"
        />
      </div>
      <div class="menu-wrapper"><Menu :isCollapse="isCollapse" /></div>
    </div>
    <div class="right">
      <Head
        :isCollapse="isCollapse"
        @clickCollapse="isCollapse = !isCollapse"
      />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";
import Menu from "./Menu.vue";
import Head from "./Head.vue";
import { getCookie } from "../../utils/util";

const router = useRouter();
const route = useRoute();
const store = useStore();
const menuVisible = computed(() => store.state.common.menuVisible);
const user = computed(() => store.state.auth.user);
const isDark = computed(() => store.state.common.dark);
const isCollapse = ref(localStorage.getItem("isCollapse") ? true : false);

const handleClose = () => {
  store.commit("common/setMenuVisible", false);
};

onMounted(() => {
  const token = getCookie("token");
  if (token) {
    store.dispatch("auth/getUserByToken");
  } else {
    router.push("/login");
  }
});

watch(isCollapse, (newVal) => {
  if (newVal) {
    localStorage.setItem("isCollapse", "1");
  } else {
    localStorage.removeItem("isCollapse");
  }
});
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
.left {
  display: flex;
  flex-direction: column;
  background-color: var(--el-menu-bg-color);
}
.logo {
  height: 50px;
  border-right: solid 1px var(--el-menu-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-logo {
  width: 45px;
  height: 45px;
  background-image: url("logo.svg");
  background-size: cover;
  background-position: center;
}
.icon-text {
  width: 100px;
  height: 45px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.menu-wrapper {
  flex: 1;
  overflow: auto;
}
.right {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  overflow: auto;
}
</style>
