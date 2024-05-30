import { Ingredient } from "@/interface/Ingredient";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useIngredientStore = defineStore("ingredient", () => {
  const ingredients = ref<Ingredient[]>([]);
  return { ingredients };
});
