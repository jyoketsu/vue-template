import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { AuthState } from "../types/AuthState";
import api from "../../utils/api";
import { ElMessage } from "element-plus";
import i18n from "../../locales";

const state: AuthState = {
  user: null,
  expired: false,
  uploadToken: null,
};

const mutations: MutationTree<AuthState> = {
  // 保存用户信息
  setUser(state, data) {
    state.user = data;
    state.expired = false;
  },
  // 清除用户信息
  clearUser(state) {
    state.user = null;
    state.expired = true;
    localStorage.clear();
  },
  setUploadToken(state, data) {
    state.uploadToken = data;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  // 登录
  async login(
    { commit },
    { username, password }: { username: string; password: string }
  ) {
    const res: any = await api.auth.login(username, password);
    if (res.status === 200) {
      const user = res.result;
      commit("setUser", user);
    } else {
      commit("clearUser");
      ElMessage.error(res.msg);
    }
  },
  // 获取用户信息
  async getUserByToken({ commit }) {
    const res: any = await api.auth.loginByToken();
    if (res.status === 200) {
      const user = res.result;
      commit("setUser", user);
    } else {
      commit("clearUser");
      ElMessage.error(res.msg);
    }
  },
  logout({ commit }) {
    commit("clearUser");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
