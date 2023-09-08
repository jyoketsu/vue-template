<template>
  <div class="login">
    <el-form
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
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";

const router = useRouter();
const route = useRoute();
const store = useStore();
const user = computed(() => store.state.auth.user);

const loginForm = reactive({
  username: "",
  password: "",
});

watch(user, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    router.push("/");
  }
});

const onSubmit = () => {
  store.dispatch("auth/login", loginForm);
};
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
