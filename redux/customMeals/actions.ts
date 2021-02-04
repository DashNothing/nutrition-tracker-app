import {
  LOAD_CUSTOM_MEALS,
  ADD_CUSTOM_MEAL,
  REMOVE_CUSTOM_MEAL,
} from "./types";
import { Meal } from "../types";

export const loadCustomMeals = (customMeals: Meal[]) => ({
  type: LOAD_CUSTOM_MEALS,
  payload: customMeals,
});

export const addCustomMeal = (meal: Meal) => ({
  type: ADD_CUSTOM_MEAL,
  payload: meal,
});

export const removeCustomMeal = (index: number) => ({
  type: REMOVE_CUSTOM_MEAL,
  payload: index,
});
