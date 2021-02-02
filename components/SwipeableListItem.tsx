import React from "react";
import { StyleSheet, Animated, View } from "react-native";
import { List, IconButton, Text, Colors } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";

import { Meal } from "../redux/nutritionStats/types";
import { removeMeal } from "../redux/nutritionStats/actions";

interface Props {
  meal: Meal;
  index: number;
}

const SwipeableListItem = ({ meal, index }: Props) => {
  const dispatch = useDispatch();

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
    }).start(() => dispatch(removeMeal(index)));
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
          title={meal.name}
          titleStyle={{ fontWeight: "600" }}
          description={meal.amount + "g"}
          right={(props) => (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                alignSelf: "center",
                marginRight: 20,
              }}
            >
              {meal.calories}kcal
            </Text>
          )}
          style={[
            styles.listItem,
            {
              backgroundColor: "white",
              borderBottomColor: "#eee",
              borderBottomWidth: 1,
            },
          ]}
        />
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 75,
    justifyContent: "center",
  },
  deleteBox: {
    backgroundColor: Colors.red600,
    justifyContent: "center",
    alignItems: "center",
    width: 75,
  },
});

export default SwipeableListItem;
