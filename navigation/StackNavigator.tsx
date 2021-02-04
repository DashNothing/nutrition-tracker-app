import React, { Fragment, useState } from "react";
import {
  createStackNavigator,
  StackHeaderProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Text } from "react-native";
import { IconButton, Menu } from "react-native-paper";

import Dashboard from "../screens/Dashboard";
import TodaysMeals from "../screens/TodaysMeals";
import AddMeal from "../screens/AddMeal";

export type RootStackParamList = {
  Dashboard: {
    isMenuOpen: boolean;
  };
  TodaysMeals: undefined;
  AddMeal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigatorScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#6ED61C",
        elevation: 0,
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
        <Menu
          visible={menuVisible}
          anchor={
            <IconButton
              color="white"
              icon="dots-vertical"
              onPress={() => toggleMenu()}
            />
          }
          onDismiss={() => toggleMenu()}
        >
          <Menu.Item
            title="Add new meal"
            onPress={() => {
              navigation.navigate("AddMeal");
              setMenuVisible(false);
            }}
          />
          <Menu.Item
            title="Today's meals"
            onPress={() => {
              navigation.navigate("TodaysMeals");
              setMenuVisible(false);
            }}
          />
        </Menu>
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
  );
};

export default StackNavigator;
