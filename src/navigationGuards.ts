// 路由鉴权
import nprogress from "./utils/nprogress";
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth";
import { message } from "./Hooks/Element-plus";

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const userStore = useAuthStore();
  const token = localStorage.getItem("auth_token");
  if (token) {
    if (to.path !== "/login" && to.path !== "/register") {
      //判断有没有用户信息
      if (!userStore.user) {
        try {
          await userStore.getUserInfoByToken(token);
          next({ ...to });
        } catch (error: any) {
          message("error", "重新登录");
          await userStore.logout();
          next({ path: "/login", query: { url: to.path } });
        }
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    if (to.path !== "/login" && to.path !== "/register") {
      next({ path: "/login", query: { url: to.path } });
    } else {
      next();
    }
  }
});

// 全局后置守卫
router.afterEach((to, from, next) => {
  nprogress.done();
});
