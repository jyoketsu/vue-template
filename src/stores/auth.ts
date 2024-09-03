import { User } from "@/interface/User";
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
    console.log("---------login-------------", username, password);

    // const userInfoRes = (await api.request.get("user")) as ResultProps;
    // if (userInfoRes.msg === "OK") {
    //   user.value = { ...userInfoRes.data };
    // }
  };
  const getUserInfoByToken = async (token: string) => {};
  const register = async () => {};
  const logout = async () => {};
  return { user, login, register, getUserInfoByToken, logout };
});
