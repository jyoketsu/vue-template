import { ApiResponse } from "@/interface/ApiResponse";
import { User } from "@/interface/User";
import api from "@/utils/api";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = (await api.auth.login(
      username,
      password
    )) as ApiResponse<string>;
    if (response.code === 200) {
      localStorage.setItem("auth_token", response.data);
    } else {
      return Promise.reject(new Error(response.message));
    }
  };
  const getUserInfoByToken = async (token: string) => {
    const response = (await api.auth.loginByToken(token)) as ApiResponse<User>;
    if (response.code === 200) {
      user.value = { ...response.data };
    } else {
      return Promise.reject(new Error(response.message));
    }
  };
  const register = async () => {};
  const logout = async () => {
    localStorage.removeItem("auth_token");
  };
  return { user, login, register, getUserInfoByToken, logout };
});
