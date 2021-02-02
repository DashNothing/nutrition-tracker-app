export type DailyGoalState = number;

export const UPDATE_DAILY_GOAL = "UPDATE_DAILY_GOAL";
export const LOAD_DAILY_GOAL = "LOAD_DAILY_GOAL";

interface UpdateDailyGoalAction {
  type: typeof UPDATE_DAILY_GOAL;
  payload: number;
}
export type DailyGoalActionTypes = UpdateDailyGoalAction;
