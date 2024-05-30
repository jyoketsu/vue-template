import { User } from "@/interface/User";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const login = async () => {
    // const userInfoRes = (await api.request.get("user")) as ResultProps;
    // if (userInfoRes.msg === "OK") {
    //   user.value = { ...userInfoRes.data };
    // }
  };
  const register = async () => {};
  return { user, login, register };
});
