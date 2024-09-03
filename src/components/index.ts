import { FileText, LayoutDashboard } from "lucide-vue-next";

export default {
  install: (app: any) => {
    app.component("FileText", FileText);
    app.component("LayoutDashboard", LayoutDashboard);
  },
};
