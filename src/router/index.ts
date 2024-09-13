import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/home/index.vue";

export const routes = [
  {
    path: "/",
    component: Home,
    redirect: "dashboard",
    children: [
      {
        path: "/dashboard",
        // icon需在@/components/index中全局注册
        meta: { title: "dashboard", icon: "LayoutDashboard", isShow: true },
        component: () => import("@/pages/home/dashboard/index.vue"),
      },
      {
        path: "/tableForm",
        meta: { title: "tableForm", icon: "Table", isShow: true },
        component: () => import("@/pages/home/table/index.vue"),
      },
      {
        path: "/tools",
        meta: { title: "tools", icon: "Hammer", isShow: true },
        component: () => import("@/pages/home/tools/index.vue"),
      },
      {
        path: "/component",
        meta: { title: "component", icon: "Component", isShow: true },
        redirect: "editor",
        children: [
          {
            path: "/editor",
            meta: { title: "editor", icon: "FileText", isShow: true },
            component: () => import("@/pages/home/editor/index.vue"),
          },
          {
            path: "/chart",
            meta: { title: "chart", icon: "LineChart", isShow: true },
            component: () => import("@/pages/home/chart/index.vue"),
          },
        ],
      },
    ],
  },
  { path: "/login", component: () => import("@/pages/login/index.vue") },
  {
    path: "/404",
    component: () => import("@/pages/404/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
