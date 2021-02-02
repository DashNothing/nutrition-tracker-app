import { UPDATE_DAILY_GOAL, LOAD_DAILY_GOAL } from "./types";

export const updateDailyGoal = (dailyGoal: number) => ({
  type: UPDATE_DAILY_GOAL,
  payload: dailyGoal,
});
