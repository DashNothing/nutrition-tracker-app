import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  withTheme,
  Title,
  Surface,
  Text,
  Button,
  Headline,
} from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import { LinearGradient } from "expo-linear-gradient";
import { Col, Row, Grid } from "react-native-easy-grid";

import { useSelector, useDispatch } from "react-redux";

import {
  Meal,
  NutritionStat,
  NutritionStatsState,
} from "../redux/nutritionStats/types";
import { AppStoreType } from "../redux/store";
import { color } from "react-native-reanimated";
import { sameDay } from "../utils/utils";
import { addMeal, updateNutritionStat } from "../redux/nutritionStats/actions";
import { RootState } from "../redux/reducers";
import { updateDailyGoal } from "../redux/dailyGoal/actions";

interface Props {
  theme: Theme;
  navigation: any;
  route: any;
}

interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

const Dashboard = ({ theme, navigation, route }: Props) => {
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

  const testNewMeal: Meal = {
    name: "Pizza slice",
    amount: 120,
    calories: 300,
    protein: 21,
    carbs: 70,
    fats: 40,
    fiber: 7,
  };

  return (
    <ScrollView style={styles.background}>
      <LinearGradient
        colors={["#9ed258", "#93cd47"]}
        style={styles.hero}
      ></LinearGradient>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Headline style={[{ alignSelf: "center" }, styles.headline]}>
            My Daily Goal
          </Headline>
          <Text style={styles.text}>
            {todaysMacros.calories} of {dailyGoal} kcal
          </Text>
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
        <View style={styles.macronutrients}>
          <Headline style={styles.headline}>Today's macronutrients</Headline>
          <Grid style={styles.grid}>
            <Row style={styles.gridRow}>
              <Col style={styles.gridColumn}>
                <Surface style={styles.macroCard}>
                  <Text style={[{ color: "#478DCD" }, styles.macroLabel]}>
                    Protein
                  </Text>
                  <Text style={[{ color: "#478DCD" }, styles.macroNumber]}>
                    {todaysMacros.protein}g
                  </Text>
                </Surface>
              </Col>
              <Col style={styles.gridColumn}>
                <Surface style={styles.macroCard}>
                  <Text style={[{ color: "#F5C139" }, styles.macroLabel]}>
                    Carbohydrates
                  </Text>
                  <Text style={[{ color: "#F5C139" }, styles.macroNumber]}>
                    {todaysMacros.carbs}g
                  </Text>
                </Surface>
              </Col>
            </Row>
            <Row style={styles.gridRow}>
              <Col style={styles.gridColumn}>
                <Surface style={[styles.macroCard]}>
                  <Text style={[{ color: "#20DA6A" }, styles.macroLabel]}>
                    Fats
                  </Text>
                  <Text style={[{ color: "#20DA6A" }, styles.macroNumber]}>
                    {todaysMacros.fats}g
                  </Text>
                </Surface>
              </Col>
              <Col style={styles.gridColumn}>
                <Surface style={styles.macroCard}>
                  <Text style={[{ color: "#8A4EEC" }, styles.macroLabel]}>
                    Fiber
                  </Text>
                  <Text style={[{ color: "#8A4EEC" }, styles.macroNumber]}>
                    {todaysMacros.fiber}g
                  </Text>
                </Surface>
              </Col>
            </Row>
          </Grid>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  hero: { alignSelf: "stretch", height: 120 },
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
  text: { alignSelf: "center" },
  todaysMealsButton: {
    color: "white",
    letterSpacing: 0,
    fontSize: 16,
  },
  macronutrients: {
    marginTop: 40,
  },
  grid: {
    marginTop: 10,
    marginBottom: 50,
  },
  gridRow: {
    paddingVertical: 5,
  },
  gridColumn: {
    paddingHorizontal: 5,
  },
  macroCard: {
    paddingVertical: 50,
  },
  macroLabel: {
    position: "absolute",
    top: 5,
    left: 10,
  },
  macroNumber: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default withTheme(Dashboard);
