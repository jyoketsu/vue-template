import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("@/pages/home/index.vue"),
    redirect: "dashboard",
    children: [
      {
        path: "/dashboard",
        // icon需在@/components/index中全局注册
        meta: { title: "dashboard", icon: "LayoutDashboard", isShow: true },
        component: () => import("@/pages/home/dashboard/index.vue"),
      },
      {
        path: "/tools",
        meta: { title: "tools", icon: "Hammer", isShow: true },
        component: () => import("@/pages/home/tools/index.vue"),
      },
      {
        path: "/tableForm",
        meta: { title: "tableForm", icon: "Table", isShow: true },
        redirect: "/biz/recipe",
      },
      {
        path: "/biz",
        meta: { title: "biz.index", icon: "Business", isShow: true },
        component: () => import("@/pages/home/biz/index.vue"),
        children: [
          {
            path: "dictionary",
            meta: { title: "biz.dictionary", icon: "BookA", isShow: true },
            component: () => import("@/pages/home/biz/dictionary/index.vue"),
          },
          {
            path: "ingredient",
            meta: { title: "biz.ingredient", icon: "Carrot", isShow: true },
            component: () => import("@/pages/home/biz/ingredient/index.vue"),
          },
          {
            path:'dish',
            meta: { title: "biz.dish", icon: "Soup", isShow: true },
            component: () => import("@/pages/home/biz/dish/index.vue"),
          },
          {
            path: "recipe",
            meta: { title: "biz.recipe", icon: "ChefHat", isShow: true },
            component: () => import("@/pages/home/biz/recipe/index.vue"),
          },
        ],
      },
      {
        path: "/component",
        meta: { title: "component.index", icon: "Component", isShow: true },
        redirect: "editor",
        children: [
          {
            path: "editor",
            meta: { title: "component.editor", icon: "FileText", isShow: true },
            component: () => import("@/pages/home/editor/index.vue"),
          },
          {
            path: "preview",
            meta: { title: "component.preview", icon: "ViewIcon", isShow: true },
            component: () => import("@/pages/home/editor/Preview.vue"),
          },
          {
            path: "gantt",
            meta: {
              title: "component.gantt",
              icon: "GanttChart",
              isShow: true,
            },
            component: () => import("@/pages/home/gantt/index.vue"),
          },
          {
            path: "chart",
            meta: { title: "component.chart", icon: "LineChart", isShow: true },
            component: () => import("@/pages/home/chart/index.vue"),
          },
        ],
      },
    ],
  },
  { path: "/login", component: () => import("@/pages/login/index.vue") },
  { path: "/register", component: () => import("@/pages/register/index.vue") },
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
