// https://lucide.dev/icons/
import {
  FileText,
  LayoutDashboard,
  Component,
  Table,
  Hammer,
  LineChart,
  GanttChart,
  BriefcaseBusiness,
  BookA,
} from "lucide-vue-next";
import Pagination from "@/components/pagination/index.vue";
import RightToolbar from "@/components/rightToolbar/index.vue";

export default {
  install: (app: any) => {
    app.component("FileText", FileText);
    app.component("LayoutDashboard", LayoutDashboard);
    app.component("Component", Component);
    app.component("Table", Table);
    app.component("Hammer", Hammer);
    app.component("LineChart", LineChart);
    app.component("Pagination", Pagination);
    app.component("RightToolbar", RightToolbar);
    app.component("GanttChart", GanttChart);
    app.component("Business", BriefcaseBusiness);
    app.component("BookA", BookA);
  },
};
