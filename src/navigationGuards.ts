// 路由鉴权
import nprogress from "./utils/nprogress";
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth";
import { message } from "./Hooks/Element-plus";
import Cookies from "js-cookie";

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const userStore = useAuthStore();

  // 检查是否需要登录
  if (to.path !== "/login" && to.path !== "/register") {
    // 如果用户未登录
    if (!userStore.user) {
      try {
        const token = Cookies.get('token');
        if (!token) {
          next({ path: "/login", query: { url: to.path } });
          return;
        }
        // 验证 token
        await userStore.getUserInfo();
        next();
      } catch (error) {
        // token 验证失败，提示重新登录
        next({ path: "/login", query: { url: to.path } });
      }
    } else {
      // 用户已登录，继续导航
      next();
    }
  } else {
    // 不需要登录，继续导航
    next();
  }
});

// 全局后置守卫
router.afterEach((to, from, next) => {
  nprogress.done();
});
