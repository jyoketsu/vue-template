import { ApiResponse } from "@/interface/ApiResponse";
import { User } from "@/interface/User";
import {
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  loginByToken,
  updateUser,
  changePassword as changePasswordApi,
} from "@/api/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from 'js-cookie';

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
    // 保存 token
    Cookies.set('token', response.data.accessToken, { sameSite: 'strict' });
    Cookies.set('refresh_token', response.data.refreshToken, { sameSite: 'strict' });
  };

  const getUserInfo = async () => {
    const response = (await loginByToken()) as ApiResponse<User>;
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
    await logoutApi();
    Cookies.remove('token');
    Cookies.remove('refresh_token');
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
    getUserInfo,
    logout,
    update,
    changePassword,
  };
});
