import React from "react";
import { StyleSheet, View } from "react-native";
import { List, IconButton, Text, Colors } from "react-native-paper";
import { useDispatch } from "react-redux";

import { Meal } from "../redux/nutritionStats/types";

interface Props {
  meal: Meal;
  index: number;
  onPress: (meal: Meal) => void;
}

const ListItem = ({ meal, index, onPress }: Props) => {
  return (
    <List.Item
      title={meal.name}
      titleStyle={{ fontWeight: "600" }}
      style={[
        styles.listItem,
        {
          backgroundColor: "white",
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        },
      ]}
      onPress={() => onPress(meal)}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 75,
    justifyContent: "center",
  },
});

export default ListItem;
