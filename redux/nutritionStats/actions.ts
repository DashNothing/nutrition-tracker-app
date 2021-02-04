import {
  CREATE_EMPTY_NUTRITION_STAT,
  LOAD_NUTRITION_STATS,
  ADD_MEAL,
  REMOVE_MEAL,
  NutritionStat,
} from "./types";
import { Meal } from "../types";

export const loadNutritionStats = (nutritionStats: NutritionStat[]) => ({
  type: LOAD_NUTRITION_STATS,
  payload: nutritionStats,
});

export const createEmptyNutritionStat = () => ({
  type: CREATE_EMPTY_NUTRITION_STAT,
  payload: null,
});

export const addMeal = (newMeal: Meal) => ({
  type: ADD_MEAL,
  payload: newMeal,
});

export const removeMeal = (index: number) => ({
  type: REMOVE_MEAL,
  payload: index,
});
