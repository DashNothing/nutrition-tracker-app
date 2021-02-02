import React, { Fragment, useState } from "react";
import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Text } from "react-native";

import Dashboard from "../screens/Dashboard";
import TodaysMeals from "../screens/TodaysMeals";
import AddMeal from "../screens/AddMeal";

import AppBar from "../components/Appbar";

import DrawerMenu from "../components/DrawerMenu";
import { IconButton } from "react-native-paper";
import { Route } from "@react-navigation/native";

export type RootStackParamList = {
  Dashboard: {
    isMenuOpen: boolean;
  };
  TodaysMeals: undefined;
  AddMeal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuChange = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

  const navigatorScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#93cd47",
      },
    };
  };

  const dashboardScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      headerTransparent: true,
      headerRight: () => (
        <IconButton
          color="white"
          icon="plus"
          onPress={() => navigation.navigate("AddMeal")}
        />
      ),
    };
  };

  const todaysMealsScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      title: "Today's meals",
      headerRight: () => (
        <IconButton
          color="white"
          icon="plus"
          onPress={() => navigation.navigate("AddMeal")}
        />
      ),
    };
  };

  const addMealScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      title: "Add a meal",
    };
  };

  return (
    <DrawerMenu
      isMenuOpen={menuOpen}
      onChange={(isOpen) => setMenuOpen(isOpen)}
    >
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route, navigation }) =>
          navigatorScreenOptions(route, navigation)
        }
        mode="modal"
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          initialParams={{ isMenuOpen: menuOpen }}
          options={({ route, navigation }) =>
            dashboardScreenOptions(route, navigation)
          }
        />
        <Stack.Screen
          name="TodaysMeals"
          component={TodaysMeals}
          options={({ route, navigation }) =>
            todaysMealsScreenOptions(route, navigation)
          }
        />
        <Stack.Screen
          name="AddMeal"
          component={AddMeal}
          options={({ route, navigation }) =>
            addMealScreenOptions(route, navigation)
          }
        />
      </Stack.Navigator>
    </DrawerMenu>
  );
};

export default StackNavigator;
