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
  Carrot,
  ChefHat,
  Trash2,
  CirclePlus,
  ImageUp,
  ViewIcon
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
    app.component("Carrot", Carrot);
    app.component("ChefHat", ChefHat);
    app.component("Delete", Trash2);
    app.component("Add", CirclePlus);
    app.component("ImageUp", ImageUp);
    app.component("ViewIcon", ViewIcon);
  },
};
