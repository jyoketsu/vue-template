import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { AuthState } from "../types/AuthState";
import api from "../../utils/api";
import { ElMessage } from "element-plus";
import { UserState } from "../types/UserState";

const state: UserState = {
  userList: [],
};

const mutations: MutationTree<UserState> = {
  setUserList(state, data) {
    state.userList = data;
  },
  clearUserList(state) {
    state.userList = [];
  },
};

const actions: ActionTree<AuthState, RootState> = {
  async getUserList({ commit }) {
    const res: any = await api.user.getUserList();
    if (res.status === 200) {
      const user = res.result;
      commit("setUserList", user);
    } else {
      commit("clearUserList");
      ElMessage.error(res.msg);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
