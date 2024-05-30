export interface Ingredient {
  _id: string;
  name: string;
  image: string;
  category: "vegetable" | "meat" | "seafood" | "fruit" | "condiment" | "other";
  availableMonths: number[];
  createTime: Date;
  updateTime: Date;
}
