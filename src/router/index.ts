import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../pages/login/index.vue";
import Home from "../pages/home/index.vue";
import Dashboard from "../pages/home/dashboard/index.vue";
import User from "../pages/home/user/index.vue";
import Ingredient from "../pages/home/ingredient/index.vue";
import Recipe from "../pages/home/recipe/index.vue";

const routes = [
  {
    path: "/",
    component: Home,
    redirect: "dashboard",
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "user", component: User },
      { path: "ingredient", component: Ingredient },
      { path: "recipe", component: Recipe },
    ],
  },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
