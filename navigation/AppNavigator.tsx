import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../screens/Dashboard";
import About from "../screens/About";

import AppBar from "../components/Appbar";

import CustomDrawerContent from "./CustomDrawerContent";

export type DashboardStackParanList = {
  MainDrawer: undefined;
};

const Stack = createStackNavigator<DashboardStackParanList>();

const Drawer = createDrawerNavigator();

const drawerItemsMain = [
  {
    key: "Dashboard",
    title: "Dashboard",
    route: { nav: "MainDrawer", routeName: "Dashboard", title: "Dashboard" },
  },
  {
    key: "About",
    title: "About",
    route: { nav: "MainDrawer", routeName: "About", title: "About" },
  },
];

const MainDrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
    >
      <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
