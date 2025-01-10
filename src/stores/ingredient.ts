import { Ingredient } from "@/interface/Recipe";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useIngredientStore = defineStore("ingredient", () => {
  const ingredients = ref<Ingredient[]>([]);
  return { ingredients };
});
