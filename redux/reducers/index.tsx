import { combineReducers } from "redux";

import nutritionStats from "./nutritionStats";
import dailyGoal from "./dailyGoal";

export const rootReducer = combineReducers({
  nutritionStats: nutritionStats,
  dailyGoal: dailyGoal,
});

export type RootState = ReturnType<typeof rootReducer>;
