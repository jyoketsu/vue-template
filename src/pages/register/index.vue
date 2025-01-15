<template>
  <div
    class="size-full flex flex-col justify-center items-center bg-gradient-to-tr from-emerald-900 to-emerald-100 dark:from-emerald-900 dark:to-zinc-900">

    <div class="flex flex-col justify-center items-center px-7 py-10 bg-white dark:bg-gray-800 rounded-md">
      <div class="font-bold text-2xl mb-10 flex items-center">
        <i class="bg-[url(/logo.svg)] bg-contain bg-no-repeat bg-center size-8 mr-2" />
        <p>Vue Template</p>
      </div>
      <el-form class="w-72 lg:w-80" ref="formRef" :model="loginForm" label-position="left" autocomplete="on"
        :rules="rules" @keyup.enter="onSubmit(formRef)">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :placeholder="$t('auth.usernamePlaceholder')">
            <template #prefix>
              <UserIcon class="size-5" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" :placeholder="$t('auth.passwordPlaceholder')">
            <template #prefix>
              <LockKeyholeIcon class="size-5" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="loginForm.confirmPassword" type="password" :placeholder="$t('auth.confirmPassword')">
            <template #prefix>
              <LockKeyholeIcon class="size-5" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt-8">
          <el-button type="primary" style="width: 100%" @click="onSubmit(formRef)">
            {{ $t("auth.register") }}
          </el-button>
        </el-form-item>
        <div class="flex justify-center">
          <span class="text-sm text-gray-500">{{ $t("auth.hasAccount") }}</span>
          <el-button link type="primary" @click="handle2Login">{{ $t("auth.loginNow") }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notification } from "@/Hooks/Element-plus";
import { useAuthStore } from "@/stores/auth";
import { FormInstance } from "element-plus";
import { LockKeyholeIcon, UserIcon } from "lucide-vue-next";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const { register } = store;

const formRef = ref<FormInstance>();
const loginForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

let rules = reactive({
  username: [
    { required: true, message: t("auth.usernamePlaceholder"), trigger: "change" },
  ],
  password: [
    { required: true, message: t("auth.passwordPlaceholder"), trigger: "change" },
    {
      min: 3,
      max: 100,
      message: t("auth.passwordValidater"),
      trigger: "change",
    },
  ],
  confirmPassword: [
    { required: true, message: t("auth.confirmPasswordPlaceholder"), trigger: "change" },
    {
      validator: (rule: any, value: string, callback: (error?: Error) => void) => {
        if (value !== loginForm.password) {
          callback(new Error(t("auth.passwordMismatch")));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
});

const onSubmit = async (formEl?: FormInstance) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await register(loginForm);
      notification(t("auth.registerSuccess"), t("auth.toLogin"), "success")
      router.push('/login');
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handle2Login = () => {
  router.push({ path: "/login" })
}
</script>
