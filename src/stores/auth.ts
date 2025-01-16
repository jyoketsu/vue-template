import { ApiResponse } from "@/interface/ApiResponse";
import { User } from "@/interface/User";
import {
  login as loginApi,
  register as registerApi,
  loginByToken,
  updateUser,
  changePassword as changePasswordApi,
} from "@/api/auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);

  const login = async ({
    username,
    password,
    captcha,
  }: {
    username: string;
    password: string;
    captcha: string;
  }) => {
    const response = (await loginApi(
      username,
      password,
      captcha
    )) as ApiResponse<User>;
    localStorage.setItem("auth_token", response.data.token);
  };

  const getUserInfoByToken = async (token: string) => {
    const response = (await loginByToken(token)) as ApiResponse<User>;
    user.value = { ...response.data };
  };

  const register = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await registerApi(username, password);
  };

  const logout = async () => {
    localStorage.removeItem("auth_token");
    user.value = null;
  };

  const update = async ({
    username,
    avatar,
  }: {
    username?: string;
    avatar?: string;
  }) => {
    if (user.value && user.value.id) {
      const response = (await updateUser(
        user.value.id,
        username,
        avatar
      )) as ApiResponse<User>;
      user.value = { ...response.data };
    }
  };

  const changePassword = async ({
    password,
    newPassword,
  }: {
    password: string;
    newPassword: string;
  }) => {
    if (user.value && user.value.username) {
      await changePasswordApi(user.value.username, password, newPassword);
    }
  };

  return {
    user,
    login,
    register,
    getUserInfoByToken,
    logout,
    update,
    changePassword,
  };
});
