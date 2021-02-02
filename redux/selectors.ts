import { NutritionStatsState } from "./nutritionStats/types";

export const getNutritionStatsStore = (store: NutritionStatsState) =>
  store.nutritionStats;

export const getNutritionStats = (store: NutritionStatsState, date: Date) => {
  getNutritionStatsStore ? getNutritionStatsStore.
};
