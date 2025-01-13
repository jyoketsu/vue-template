import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import i18n from "./locales";
import { ClickOutside } from "element-plus";
import { createPinia } from "pinia";
import component from "@/components/index";
import vuegantt from '@jyoketsu/vue-gantt'
import "@/styles/light/css-vars.css";
import "@/styles/dark/css-vars.css";
import "@/styles/element/custom.css";
import "./navigationGuards";
// import "./mock/index";

const pinia = createPinia();
const app = createApp(App);
app.directive("clickoutside", ClickOutside);
app.use(component);
app.use(vuegantt);
app.use(pinia).use(router).use(i18n).mount("#app");
