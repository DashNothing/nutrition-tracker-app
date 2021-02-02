export interface NutritionStat {
  date: Date;
  meals: Meal[];
}

export interface Meal {
  name: string;
  amount: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export type NutritionStatsState = NutritionStat[];

export const CREATE_EMPTY_NUTRITION_STAT = "CREATE_EMPTY_NUTRITION_STAT";
export const LOAD_NUTRITION_STATS = "LOAD_NUTRITION_STATS";
export const ADD_MEAL = "ADD_MEAL";
export const REMOVE_MEAL = "REMOVE_MEAL";

interface CreateEmptyNutritionStatAction {
  type: typeof CREATE_EMPTY_NUTRITION_STAT;
  payload: null;
}

interface AddNutritionStatsAction {
  type: typeof LOAD_NUTRITION_STATS;
  payload: NutritionStat[];
}

interface AddMealAction {
  type: typeof ADD_MEAL;
  payload: Meal;
}

interface RemoveMealAction {
  type: typeof REMOVE_MEAL;
  payload: number;
}

export type NutritionStatsActionTypes =
  | AddNutritionStatsAction
  | AddMealAction
  | CreateEmptyNutritionStatAction
  | RemoveMealAction;
