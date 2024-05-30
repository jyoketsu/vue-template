<template>
  <div class="login" v-loading="true">
    <!-- <el-form
      class="login-form"
      :model="loginForm"
      label-position="left"
      autocomplete="on"
    >
      <el-form-item>
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit">
          login
        </el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const query = route.query;
const token = query.token;
const redirectPath = query.redirectPath;
const store = useAuthStore();
const { user } = storeToRefs(store);
const { login } = store;

const loginForm = reactive({
  username: "",
  password: "",
});

// watch(user, (newVal, oldVal) => {
//   if (newVal && !oldVal) {
//     router.push(`/${redirectPath}`);
//   }
// });

// const onSubmit = () => {
//   store.dispatch("auth/login", loginForm);
// };

onMounted(() => {
  // if (user.value) {
  //   store.dispatch("knowledgeBase/clearKnowledgeBase");
  //   store.dispatch("knowledgeBase/clearDetail");
  //   router.push(`/${redirectPath}`);
  // } else if (token) {
  //   store.dispatch("auth/getUserByToken", token);
  // }
});
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
}
.login-form {
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
</style>
