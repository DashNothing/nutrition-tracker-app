import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
import { List, Text } from "react-native-paper";

import SwipeableListItem from "../components/SwipeableListItem";

import { useSelector } from "react-redux";
import { Meal } from "../redux/nutritionStats/types";
import { AppStoreType } from "../redux/store";
import { sameDay } from "../utils/utils";

interface Props {
  navigation: any;
}

interface MealId {
  meal: Meal;
  id: number;
}

const TodaysMeals = ({ navigation }: Props) => {
  let meals: MealId[] = useSelector((state: AppStoreType) => {
    const todaysStats = state.nutritionStats.find((stat) =>
      sameDay(stat.date, new Date())
    );
    if (todaysStats) {
      const myMeals = todaysStats.meals.map((meal, index) => {
        return {
          meal: meal,
          id: index,
        };
      });
      return myMeals;
    }
    return [];
  });

  const renderItem = ({ item, index }: ListRenderItemInfo<MealId>) => {
    return <SwipeableListItem meal={item.meal} index={item.id} />;
  };

  return (
    <FlatList
      data={meals}
      extraData={meals}
      renderItem={renderItem}
      keyExtractor={(item) => "key" + item.id}
    />
  );
};

const styles = StyleSheet.create({});

export default TodaysMeals;
