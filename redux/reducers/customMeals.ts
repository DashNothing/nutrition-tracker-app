import {
  ADD_CUSTOM_MEAL,
  CustomMealsActionTypes,
  CustomMealsState,
  LOAD_CUSTOM_MEALS,
  REMOVE_CUSTOM_MEAL,
} from "../customMeals/types";
import { Meal } from "../types";

const initialState: CustomMealsState = [];

export default (
  customMeals: CustomMealsState = initialState,
  action: CustomMealsActionTypes
) => {
  switch (action.type) {
    case LOAD_CUSTOM_MEALS:
      return action.payload;

    case ADD_CUSTOM_MEAL:
      let newMeal = action.payload;
      newMeal.amount = 100;
      return [...customMeals, newMeal];

    case REMOVE_CUSTOM_MEAL:
      let newCustomMeals = [...customMeals];
      newCustomMeals.splice(action.payload, 1);
      return newCustomMeals;

    default:
      return customMeals;
  }
};
