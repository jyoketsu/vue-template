<template>
  <div class="home">
    <div class="left">
      <div class="logo">
        <i
          class="icon-logo"
          :style="`margin-right: ${isCollapse ? 0 : 8}px;`"
        />
        <i v-if="!isCollapse" class="icon-text" />
      </div>
      <div class="menu-wrapper"><Menu :isCollapse="isCollapse" /></div>
    </div>
    <div class="content">
      <Head
        :isCollapse="isCollapse"
        @clickCollapse="isCollapse = !isCollapse"
      />
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
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
const isCollapse = ref(false);

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
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
}
.left {
  display: flex;
  flex-direction: column;
  background-color: var(--el-menu-bg-color);
  flex-shrink: 0;
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
  background-image: url("logo-title.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.menu-wrapper {
  flex: 1;
  overflow: auto;
}
.content {
  flex: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 1fr;
}
</style>
