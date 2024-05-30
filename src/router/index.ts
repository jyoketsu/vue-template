import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/pages/login/index.vue";
import Home from "@/pages/home/index.vue";
import Dashboard from "@/pages/home/dashboard/index.vue";

const routes = [
  {
    path: "/",
    component: Home,
    redirect: "dashboard",
    children: [{ path: "dashboard", component: Dashboard }],
  },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
