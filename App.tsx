import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";

import { Provider } from "react-redux";
import { rootReducer, RootState } from "./redux/reducers";
import { createStore } from "redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  CREATE_EMPTY_NUTRITION_STAT,
  LOAD_NUTRITION_STATS,
  NutritionStat,
} from "./redux/nutritionStats/types";
import { UPDATE_DAILY_GOAL } from "./redux/dailyGoal/types";

import { dateTimeReviver, sameDay } from "./utils/utils";

export default function App() {
  //AsyncStorage.removeItem("appState");

  const [isLoading, setIsLoading] = useState(true);

  const initalStoreValue: any = {
    nutritionStats: [],
    dailyGoal: 2000,
  };

  let store = createStore(rootReducer, initalStoreValue);
  store.subscribe(() => saveToLocalStorage(store.getState()));

  // Saves store state to local storage
  const saveToLocalStorage = (state: RootState) => {
    try {
      const serializedState = JSON.stringify(state);
      AsyncStorage.setItem("appState", serializedState);
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch stored state from local storage
  AsyncStorage.getItem("appState").then((data) => {
    if (data != null) {
      let localStorageData: RootState = JSON.parse(data, dateTimeReviver);
      let fetchedNutritionStats: NutritionStat[] =
        localStorageData.nutritionStats;
      let fetchedDailyGoal = localStorageData.dailyGoal;

      store.dispatch({
        type: LOAD_NUTRITION_STATS,
        payload: fetchedNutritionStats,
      });

      store.dispatch({
        type: UPDATE_DAILY_GOAL,
        payload: fetchedDailyGoal,
      });

      // Add empty NutritionStat object with current date if none exist
      let todaysStat:
        | NutritionStat
        | undefined = fetchedNutritionStats.find((stat) =>
        sameDay(stat.date, new Date())
      );
      if (!todaysStat) {
        store.dispatch({
          type: CREATE_EMPTY_NUTRITION_STAT,
          payload: null,
        });
      }
    }
  });

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
  },
});

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#478DCD",
    accent: "#478DCD",
  },
};
