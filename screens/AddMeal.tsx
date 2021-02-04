import React from "react";
import { StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";

import AddMealUSDA from "../components/AddMealUSDA";
import AddMealCustom from "../components/AddMealCustom";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Theme } from "react-native-paper/lib/typescript/types";

type Props = {
  navigation: any;
  theme: Theme;
};

const Tab = createMaterialTopTabNavigator();

const AddMeal = ({ navigation, theme }: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="USDA"
      tabBarOptions={{
        style: { backgroundColor: "#6ED61C", elevation: 0 },
        labelStyle: { color: "white", fontSize: 14 },
        indicatorStyle: { backgroundColor: "white", zIndex: 1 },
      }}
    >
      <Tab.Screen
        name="USDA"
        component={AddMealUSDA}
        options={{ title: "Find food" }}
      />
      <Tab.Screen
        name="Custom"
        component={AddMealCustom}
        options={{ title: "Saved food" }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(AddMeal);
