import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
} from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

import { Provider, useDispatch } from "react-redux";
import { AppStoreType } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./navigation/StackNavigator";

import { rootReducer, RootState } from "./redux/reducers";
import { CombinedState, createStore, Store } from "redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  CREATE_EMPTY_NUTRITION_STAT,
  LOAD_NUTRITION_STATS,
  NutritionStat,
} from "./redux/nutritionStats/types";
import { updateDailyGoal } from "./redux/dailyGoal/actions";
import { dateWithoutTime, dateTimeReviver, sameDay } from "./utils/utils";
import { LOAD_DAILY_GOAL, UPDATE_DAILY_GOAL } from "./redux/dailyGoal/types";

export default function App() {
  //AsyncStorage.removeItem("appState");

  const [isLoading, setIsLoading] = useState(true);

  const saveToLocalStorage = (state: RootState) => {
    try {
      const serializedState = JSON.stringify(state);
      AsyncStorage.setItem("appState", serializedState);
    } catch (e) {
      console.log(e);
    }
  };

  const initalStoreValue: any = {
    nutritionStats: [],
    dailyGoal: 0,
  };

  let store = createStore(rootReducer, initalStoreValue);
  store.subscribe(() => saveToLocalStorage(store.getState()));

  // Fetch stored state from local storage
  AsyncStorage.getItem("appState").then((data) => {
    if (data != null) {
      let localStorageData: AppStoreType = JSON.parse(data, dateTimeReviver);
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

  useEffect(() => {
    setIsLoading(false);
  }, [store.getState().nutritionStats]);

  if (isLoading) {
    return <View></View>;
  } else
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
    primary: "#21cd9a",
    accent: "#fa9481",
  },
};
