import React, { memo } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { List, IconButton, Text, Colors } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Meal } from "../redux/nutritionStats/types";

interface Props {
  meal: Meal;
  index: number;
  onRemoveMeal: () => void;
  onPress?: () => void;
  simple?: boolean;
}

const SwipeableListItem = ({
  meal,
  index,
  onRemoveMeal,
  onPress,
  simple,
}: Props) => {
  const animationDuration = 300;

  let removeAnimation = new Animated.Value(1);

  const animatedViewStyle = {
    transform: [
      {
        translateX: removeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: removeAnimation,
    height: removeAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 75],
      extrapolate: "clamp",
    }),
  };

  const removeItem = () => {
    Animated.timing(removeAnimation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(onRemoveMeal);
  };

  const rightSwipe = () => {
    return (
      <View style={styles.deleteBox}>
        <IconButton
          icon="delete"
          color={Colors.white}
          size={24}
          onPress={removeItem}
        />
      </View>
    );
  };

  return (
    <Animated.View style={animatedViewStyle}>
      <Swipeable
        renderRightActions={rightSwipe}
        overshootRight={false}
        friction={2}
      >
        <List.Item
          style={styles.listItem}
          title={meal.name}
          titleStyle={{ fontWeight: "600" }}
          description={simple ? null : meal.amount + "g"}
          right={
            simple
              ? undefined
              : (props) => (
                  <Text style={styles.listItemRIght}>{meal.calories}kcal</Text>
                )
          }
          onPress={onPress}
        />
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 75,
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  listItemRIght: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: 20,
  },
  deleteBox: {
    backgroundColor: Colors.red600,
    justifyContent: "center",
    alignItems: "center",
    width: 75,
  },
});

export default memo(SwipeableListItem);
