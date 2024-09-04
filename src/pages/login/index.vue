<template>
  <div class="size-full flex justify-center items-center">
    <el-form class="w-80" ref="formRef" :model="loginForm" label-position="left" autocomplete="on" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <template #prefix>
            <UserIcon class="size-5" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
          <template #prefix>
            <LockKeyholeIcon class="size-5" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit(formRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { message, notification } from "@/Hooks/Element-plus";
import { useAuthStore } from "@/stores/auth";
import { FormInstance } from "element-plus";
import { LockKeyholeIcon, UserIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const query = route.query;
const token = query.token;
const redirectPath = query.redirectPath;
const store = useAuthStore();
const { user } = storeToRefs(store);
const { login } = store;

const formRef = ref<FormInstance>();
const loginForm = reactive({
  username: "",
  password: "",
});

let rules = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "change" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "change" },
    {
      min: 3,
      max: 100,
      message: "Length should be 3 to 100",
      trigger: "change",
    },
  ],
});

const onSubmit = async (formEl?: FormInstance) => {
  try {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        await login(loginForm);
        notification("登录成功", "您好，欢迎回来!", "success")
        router.push({ path: (route.query.url as any) || '/' });
      } else {
        console.log("error submit!", fields);
      }
    });
  } catch (err: any) {
    message("error", err.message);
  }
};
</script>
