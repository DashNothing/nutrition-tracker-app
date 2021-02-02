import {
  UPDATE_DAILY_GOAL,
  DailyGoalState,
  DailyGoalActionTypes,
  LOAD_DAILY_GOAL,
} from "../dailyGoal/types";

const initialState: DailyGoalState = 2200;

export default (
  dailyGoal: DailyGoalState = initialState,
  action: DailyGoalActionTypes
) => {
  switch (action.type) {
    case UPDATE_DAILY_GOAL:
      return action.payload;

    default:
      return dailyGoal;
  }
};
