//路由鉴权
import nprogress from "./utils/nprogress";
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ElMessage } from "element-plus";
import { message } from "./Hooks/Element-plus";

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const userStore = useAuthStore();
  const token = localStorage.getItem("auth_token");
  console.log("------userStore.user---", userStore.user);

  if (token) {
    if (to.path !== "/login") {
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
      next({ path: "/" });
    }
  } else {
    if (to.path !== "/login") {
      next({ path: "/login", query: { url: to.path } });
    } else {
      next();
    }
  }
});

//全局后置守卫
router.afterEach((to, from, next) => {
  nprogress.done();
});
