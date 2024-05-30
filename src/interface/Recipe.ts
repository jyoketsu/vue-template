export interface Recipe {
  _id: string;
  title: string;
  // 大荤 小荤 素菜 汤 单品
  type: "dahun" | "xiaohun" | "vegetarian" | "soup" | "single";
  description: string;
  cover?: string;
  content: string;
  createTime: Date;
  updateTime: Date;
}
