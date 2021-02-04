import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import SwipeableListItem from "../components/SwipeableListItem";

import { useSelector, useDispatch } from "react-redux";

import { Meal } from "../redux/types";
import { RootState } from "../redux/reducers";
import { removeMeal } from "../redux/nutritionStats/actions";

import { randomID, sameDay } from "../utils/utils";

interface MealId {
  meal: Meal;
  id: string;
}

const TodaysMeals = () => {
  const dispatch = useDispatch();

  let meals: MealId[] = useSelector((state: RootState) => {
    const todaysStats = state.nutritionStats.find((stat) =>
      sameDay(stat.date, new Date())
    );
    if (todaysStats) {
      const myMeals = todaysStats.meals.map((meal, index) => {
        return {
          meal: meal,
          id: randomID(),
        };
      });
      return myMeals;
    }
    return [];
  });

  const handleRemoveMeal = (index: number) => {
    dispatch(removeMeal(index));
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<MealId>) => {
    return (
      <SwipeableListItem
        meal={item.meal}
        index={index}
        onRemoveMeal={() => {
          handleRemoveMeal(index);
        }}
      />
    );
  };

  return (
    <FlatList
      data={meals}
      extraData={meals}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TodaysMeals;
