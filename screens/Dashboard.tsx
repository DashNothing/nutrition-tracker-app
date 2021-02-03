import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  withTheme,
  Surface,
  Text,
  Button,
  Headline,
  Dialog,
  Portal,
  TextInput,
  FAB,
} from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressCircle } from "react-native-svg-charts";

import MacrosGrid from "../components/MacrosGrid";

import { useSelector, useDispatch } from "react-redux";

import {
  Meal,
  NutritionStat,
  NutritionStatsState,
} from "../redux/nutritionStats/types";
import { AppStoreType } from "../redux/store";

import { sameDay } from "../utils/utils";
import { RootState } from "../redux/reducers";
import { updateDailyGoal } from "../redux/dailyGoal/actions";

interface Props {
  theme: Theme;
  navigation: any;
  route: any;
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

const Dashboard = ({ theme, navigation, route }: Props) => {
  const [dailyGoalDialogVisible, setDailyGoalDialogVisible] = useState(false);
  const [dailyGoalInput, setDailyGoalnput] = useState(
    useSelector((state: RootState) => state.dailyGoal.toString())
  );

  const dispatch = useDispatch();

  let todaysMacros: Macros = useSelector((state: RootState) => {
    let macros: Macros;

    if (state.nutritionStats.length > 0) {
      const todaysStats = state.nutritionStats.find((stat) =>
        sameDay(stat.date, new Date())
      );

      if (todaysStats && todaysStats.meals.length != 0) {
        let calories = todaysStats.meals
          .map((meal) => meal.calories)
          .reduce((prev, next) => prev + next);
        let protein = todaysStats.meals
          .map((meal) => meal.protein)
          .reduce((prev, next) => prev + next);
        let carbs = todaysStats.meals
          .map((meal) => meal.carbs)
          .reduce((prev, next) => prev + next);
        let fats = todaysStats.meals
          .map((meal) => meal.fats)
          .reduce((prev, next) => prev + next);
        let fiber = todaysStats.meals
          .map((meal) => meal.fiber)
          .reduce((prev, next) => prev + next);

        macros = { calories, carbs, protein, fats, fiber };
      } else {
        macros = {
          protein: 0,
          carbs: 0,
          calories: 0,
          fats: 0,
          fiber: 0,
        };
      }
      return macros;
    }
    macros = {
      protein: 0,
      carbs: 0,
      calories: 0,
      fats: 0,
      fiber: 0,
    };
    return macros;
  });

  let dailyGoal = useSelector((state: AppStoreType) => state.dailyGoal);

  const closeDailyGoalDIalog = () => {
    setDailyGoalDialogVisible(false);
    setDailyGoalnput(dailyGoal.toString());
  };

  const progressChartColor = () => {
    const progress = todaysMacros.calories / dailyGoal;
    if (progress < 0.25) {
      return "#ACF154";
    } else if (progress < 0.5) {
      return "#88E90E";
    } else if (progress < 0.75) {
      return "#6ED61C";
    } else if (progress <= 1.1) {
      return "#2ECD15";
    } else {
      return "#E9C924";
    }
  };

  return (
    <Fragment>
      <ScrollView style={styles.background}>
        <LinearGradient
          colors={["#6ED61C", "#93cd47"]}
          style={styles.hero}
        ></LinearGradient>
        <View style={styles.container}>
          <Surface style={styles.surface}>
            <Headline style={[{ alignSelf: "center" }, styles.headline]}>
              My Daily Goal
            </Headline>
            <View>
              <ProgressCircle
                style={styles.progressCircle}
                progress={todaysMacros.calories / dailyGoal}
                progressColor={progressChartColor()}
                strokeWidth={16}
              />
              <View style={styles.progrressCircleLabelContainer}>
                <Text
                  style={[
                    styles.progressCircleLabel,
                    { color: progressChartColor() },
                  ]}
                >
                  {Math.round((todaysMacros.calories / dailyGoal) * 100)}%
                </Text>
              </View>
            </View>
            <Text style={styles.progressText}>
              {todaysMacros.calories} of {dailyGoal} kcal
            </Text>
            <Button mode="text" onPress={() => setDailyGoalDialogVisible(true)}>
              Change my daily goal
            </Button>
          </Surface>
          <Button
            mode="contained"
            color="#478DCD"
            contentStyle={{ paddingVertical: 2 }}
            labelStyle={styles.todaysMealsButton}
            onPress={() => {
              console.log("Button pressed");
              navigation.navigate("TodaysMeals");
            }}
          >
            See today's meals
          </Button>
          <MacrosGrid macros={todaysMacros} />
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          visible={dailyGoalDialogVisible}
          onDismiss={() => {
            closeDailyGoalDIalog();
          }}
        >
          <Dialog.Title>Change my daily goal</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="My daily goal"
              value={dailyGoalInput}
              onChangeText={(text) => {
                setDailyGoalnput(text.replace(/[^0-9]/g, ""));
              }}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                closeDailyGoalDIalog();
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                if (dailyGoalInput != "") {
                  dispatch(updateDailyGoal(parseInt(dailyGoalInput)));
                }
                closeDailyGoalDIalog();
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        style={styles.fab}
        icon="food-apple"
        onPress={() => {
          navigation.navigate("AddMeal");
        }}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  hero: { alignSelf: "stretch", height: 120 },
  progressCircle: {
    marginVertical: 30,
    height: 180,
  },
  progrressCircleLabelContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleLabel: {
    fontSize: 36,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 15,
  },
  surface: {
    position: "relative",
    top: -40,
    elevation: 16,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: "stretch",
    borderRadius: 16,
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
  todaysMealsButton: {
    color: "white",
    letterSpacing: 0,
    fontSize: 16,
  },

  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});

export default withTheme(Dashboard);
