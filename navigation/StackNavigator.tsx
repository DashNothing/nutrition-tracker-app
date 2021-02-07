import React, { useState } from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { IconButton, Menu } from "react-native-paper";

import Dashboard from "../screens/Dashboard";
import TodaysMeals from "../screens/TodaysMeals";
import AddMeal from "../screens/AddMeal";
import CustomMeals from "../screens/CustomMeals";
import AddCustomMeal from "../screens/AddCustomMeal";
import ProgressCalendar from "../screens/ProgressCalendar";

export type RootStackParamList = {
  Dashboard: undefined;
  TodaysMeals: undefined;
  AddMeal: undefined;
  CustomMeals: undefined;
  AddCustomMeal: undefined;
  ProgressCalendar: undefined;
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
            title="My saved meals"
            icon="playlist-edit"
            onPress={() => {
              navigation.navigate("CustomMeals");
              setMenuVisible(false);
            }}
          />
          <Menu.Item
            title="Progress calendar"
            icon="calendar"
            onPress={() => {
              navigation.navigate("ProgressCalendar");
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

  const customMealsScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      title: "Saved meals",
      headerRight: () => (
        <IconButton
          color="white"
          icon="plus"
          onPress={() => navigation.navigate("AddCustomMeal")}
        />
      ),
    };
  };

  const addCustomMealScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      title: "Add my meal",
    };
  };

  const progressCalendarScreenOptions = (
    route: any,
    navigation: any
  ): StackNavigationOptions => {
    return {
      title: "Progress calendar",
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
      <Stack.Screen
        name="CustomMeals"
        component={CustomMeals}
        options={({ route, navigation }) =>
          customMealsScreenOptions(route, navigation)
        }
      />
      <Stack.Screen
        name="AddCustomMeal"
        component={AddCustomMeal}
        options={({ route, navigation }) =>
          addCustomMealScreenOptions(route, navigation)
        }
      />
      <Stack.Screen
        name="ProgressCalendar"
        component={ProgressCalendar}
        options={({ route, navigation }) =>
          progressCalendarScreenOptions(route, navigation)
        }
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
