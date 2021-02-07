import React, { Fragment, useState } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { Meal } from "../redux/types";
import { randomID } from "../utils/utils";
import SwipeableListItem from "../components/SwipeableListItem";
import { removeCustomMeal } from "../redux/customMeals/actions";

interface MealId {
  meal: Meal;
  id: string;
}

const CustomMeals = () => {
  const dispatch = useDispatch();

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

  const handleRemoveMeal = (index: number) => {
    dispatch(removeCustomMeal(index));
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<MealId>) => {
    return (
      <SwipeableListItem
        meal={item.meal}
        index={index}
        onRemoveMeal={() => {
          handleRemoveMeal(index);
        }}
        simple
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
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default CustomMeals;
