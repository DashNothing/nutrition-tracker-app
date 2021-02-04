import React, { Fragment, useState } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { Text } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { addCustomMeal, removeCustomMeal } from "../redux/customMeals/actions";
import { addMeal } from "../redux/nutritionStats/actions";
import { RootState } from "../redux/reducers";
import { Meal } from "../redux/types";
import { randomID } from "../utils/utils";
import AddMealDialog from "./AddMealDIalog";
import SwipeableListItem from "./SwipeableListItem";

interface MealId {
  meal: Meal;
  id: string;
}

interface Props {
  navigation: any;
}

const AddMealCustom = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [chosenMeal, setChosenMeal] = useState<Meal | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  let customMeals: MealId[] = useSelector((state: RootState) => {
    const fetchedMeals = state.customMeals;
    if (fetchedMeals) {
      return fetchedMeals.map((meal) => {
        return {
          meal: meal,
          id: randomID().toString(),
        };
      });
    }
    return [];
  });

  const confirmDialog = (gramsInput: string) => {
    if (chosenMeal) {
      let meal: Meal = chosenMeal;
      meal.amount = parseInt(gramsInput);
      meal.calories = Math.round((meal.calories * meal.amount) / 100);
      meal.protein = Math.round((meal.protein * meal.amount) / 100);
      meal.carbs = Math.round((meal.carbs * meal.amount) / 100);
      meal.fats = Math.round((meal.fats * meal.amount) / 100);
      meal.fiber = Math.round((meal.fiber * meal.amount) / 100);

      dispatch(addMeal(meal));
      navigation.navigate("Dashboard");
    }
  };

  const handleDialogDismiss = () => {
    setDialogVisible(false);
  };

  const handleRemoveMeal = (index: number) => {
    dispatch(removeCustomMeal(index));
  };

  const handleItemPress = (meal: Meal) => {
    setChosenMeal(meal);
    setDialogVisible(true);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<MealId>) => {
    return (
      <SwipeableListItem
        meal={item.meal}
        index={index}
        onRemoveMeal={() => {
          handleRemoveMeal(index);
        }}
        onPress={() => {
          handleItemPress(item.meal);
        }}
      />
    );
  };

  return (
    <Fragment>
      <FlatList
        data={customMeals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <AddMealDialog
        visible={dialogVisible}
        onDismiss={handleDialogDismiss}
        onConfirm={confirmDialog}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default AddMealCustom;
