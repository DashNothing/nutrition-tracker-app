import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { StackHeaderProps } from "@react-navigation/stack";

type AppBarProps = {
  stackHeaderProps: StackHeaderProps;
  onHamburgerPress: Function;
};

const AppBar = ({ stackHeaderProps, onHamburgerPress }: AppBarProps) => {
  const routeName = stackHeaderProps.scene.route.name;

  return (
    <Appbar
      style={[
        styles.appBar,
        //routeName == "Dashboard" ? styles.heroAppBar : null,
      ]}
    >
      <Appbar.Action
        icon="menu"
        onPress={() => onHamburgerPress()}
        color="white"
      />
      <Appbar.Content title={routeName} titleStyle={styles.title} />
      <Appbar.Action
        icon="plus"
        onPress={() => stackHeaderProps.navigation.navigate("AddMeal")}
        color="white"
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  appBar: {
    elevation: 0,
    color: "white",
    backgroundColor: "#93cd47",
    zIndex: 10,
  },
  heroAppBar: {
    backgroundColor: "transparent",
  },
  title: {
    color: "white",
  },
});

export default AppBar;
