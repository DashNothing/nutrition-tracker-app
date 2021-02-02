import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SideMenu from "react-native-side-menu-updated";

type DrawerMenuProps = {
  isMenuOpen: boolean;
  onChange: (isOpen: boolean) => void;
  children: JSX.Element;
};

const DrawerMenu = ({ isMenuOpen, onChange, children }: DrawerMenuProps) => {
  const menu = <View style={styles.container}></View>;
  return (
    <SideMenu
      menu={menu}
      isOpen={isMenuOpen}
      menuPosition="left"
      bounceBackOnOverdraw={false}
      onChange={(isOpen) => onChange(isOpen)}
    >
      {children}
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
  },
});

export default DrawerMenu;
