<template>
  <div class="home">
    <Head />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, onMounted, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";
import Head from "./Head.vue";
import { getCookie } from "../../utils/util";
const router = useRouter();
const route = useRoute();
const store = useStore();
const menuVisible = computed(() => store.state.common.menuVisible);
const user = computed(() => store.state.auth.user);

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
}
.content {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
