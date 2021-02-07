import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { List, IconButton, Text, Colors } from "react-native-paper";
import { useDispatch } from "react-redux";

import { Meal } from "../redux/types";

interface Props {
  name: string;
  value: number;
}

const ListItem = ({ name, value }: Props) => {
  return (
    <List.Item
      title={name}
      titleStyle={{ fontWeight: "600" }}
      right={() => <Text style={styles.listItemRIght}>{value}g</Text>}
      style={[
        styles.listItem,
        {
          backgroundColor: "white",
          elevation: 2,
          marginBottom: 8,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 75,
    justifyContent: "center",
  },
  listItemRIght: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: 20,
  },
});

export default memo(ListItem);
