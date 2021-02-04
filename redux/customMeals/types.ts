import { Meal } from "../types";

export type CustomMealsState = Meal[];

export const LOAD_CUSTOM_MEALS = "LOAD_CUSTOM_MEALS";
export const ADD_CUSTOM_MEAL = "ADD_CUSTOM_MEAL";
export const REMOVE_CUSTOM_MEAL = "REMOVE_CUSTOM_MEAL";

interface LoadCustomMealsAction {
  type: typeof LOAD_CUSTOM_MEALS;
  payload: Meal[];
}

interface AddCustomMealAction {
  type: typeof ADD_CUSTOM_MEAL;
  payload: Meal;
}

interface RemoveCustomMealAction {
  type: typeof REMOVE_CUSTOM_MEAL;
  payload: number;
}

export type CustomMealsActionTypes =
  | LoadCustomMealsAction
  | AddCustomMealAction
  | RemoveCustomMealAction;
