import {
  createStore,
  applyMiddleware,
  Middleware,
  Dispatch,
  AnyAction,
} from "redux";
import { DailyGoalState } from "./dailyGoal/types";
import { NutritionStatsState } from "./nutritionStats/types";
import { rootReducer } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppStoreType = {
  nutritionStats: NutritionStatsState;
  dailyGoal: DailyGoalState;
};

const saveToLocalStorage = (state: AppStoreType) => {
  try {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem("appState", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const store = createStore(rootReducer);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
