import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import { Headline, Surface, Text } from "react-native-paper";
import CalorieProgressCircle from "../components/CalorieProgressChart";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { sameDay } from "../utils/utils";
import ListItem from "../components/ListItem";
import MacroListItem from "../components/MacroListItem";
import { ScrollView } from "react-native-gesture-handler";

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

const ProgressCalendar = () => {
  const [pickedDate, setPickedDate] = useState(moment());
  const [macros, setMacros] = useState<Macros | undefined>();

  let dailyGoal = useSelector((state: RootState) => state.dailyGoal);

  let nutritionStats = useSelector(
    (state: RootState) => state.nutritionStats
  ).find((stat) => sameDay(stat.date, pickedDate.toDate()));

  useEffect(() => {
    console.log(nutritionStats);
    if (nutritionStats && nutritionStats.meals.length > 0) {
      let calories = nutritionStats.meals
        .map((meal) => meal.calories)
        .reduce((prev, next) => prev + next);
      let protein = nutritionStats.meals
        .map((meal) => meal.protein)
        .reduce((prev, next) => prev + next);
      let carbs = nutritionStats.meals
        .map((meal) => meal.carbs)
        .reduce((prev, next) => prev + next);
      let fats = nutritionStats.meals
        .map((meal) => meal.fats)
        .reduce((prev, next) => prev + next);
      let fiber = nutritionStats.meals
        .map((meal) => meal.fiber)
        .reduce((prev, next) => prev + next);

      setMacros({ calories, carbs, protein, fats, fiber });
    } else {
      setMacros(undefined);
    }
    console.log("Macros: ");
    console.log(macros);
  }, [pickedDate]);

  const progressCircle = () => {
    if (macros) {
      return (
        <Fragment>
          <Headline style={[{ alignSelf: "center" }, styles.headline]}>
            Date
          </Headline>
          <CalorieProgressCircle calories={macros?.calories} goal={dailyGoal} />
          <View style={styles.macrosContainer}>
            <MacroListItem name="Protein" value={macros.protein} />
            <MacroListItem name="Carbohydrates" value={macros.carbs} />
            <MacroListItem name="Fats" value={macros.fats} />
            <MacroListItem name="Fiber" value={macros.fiber} />
          </View>
        </Fragment>
      );
    } else {
      return (
        <Text>No nutritional information found for the selected day.</Text>
      );
    }
  };

  return (
    <ScrollView>
      <CalendarStrip
        scrollable
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={"#fff"}
        calendarHeaderStyle={{ color: "black" }}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        iconContainer={{ flex: 0.1 }}
        highlightDateContainerStyle={{ backgroundColor: "#478DCD" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
        maxDate={moment()}
        onDateSelected={(date) => setPickedDate(date)}
        selectedDate={moment()}
      />
      {progressCircle()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 18,
    fontWeight: "bold",
  },
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
  macrosContainer: {
    marginVertical: 50,
  },
});

export default ProgressCalendar;
