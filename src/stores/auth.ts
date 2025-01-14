import { ApiResponse } from "@/interface/ApiResponse";
import { User } from "@/interface/User";
import { login as loginApi, loginByToken } from "@/api/auth";
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
    const response = (await loginApi(username, password)) as ApiResponse<User>;
    localStorage.setItem("auth_token", response.data.token);
  };
  const getUserInfoByToken = async (token: string) => {
    const response = (await loginByToken(token)) as ApiResponse<User>;
    user.value = { ...response.data };
  };
  const register = async () => {};
  const logout = async () => {
    localStorage.removeItem("auth_token");
    user.value = null;
  };
  return { user, login, register, getUserInfoByToken, logout };
});
