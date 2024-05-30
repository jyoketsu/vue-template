import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales";
import { ClickOutside } from "element-plus";
import { createPinia } from "pinia";
import "@/styles/dark/css-vars.css";

const pinia = createPinia();
const app = createApp(App);
app.directive("clickoutside", ClickOutside);
app.use(pinia).use(router).use(i18n).mount("#app");
