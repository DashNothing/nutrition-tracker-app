import { combineReducers } from "redux";

import nutritionStats from "./nutritionStats";
import dailyGoal from "./dailyGoal";
import customMeals from "./customMeals";

export const rootReducer = combineReducers({
  nutritionStats: nutritionStats,
  dailyGoal: dailyGoal,
  customMeals: customMeals,
});

export type RootState = ReturnType<typeof rootReducer>;
