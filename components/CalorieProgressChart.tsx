import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ProgressCircle } from "react-native-svg-charts";

interface Props {
  calories: number;
  goal: number;
}

const CalorieProgressCircle = ({ calories, goal }: Props) => {
  const progressChartColor = () => {
    const progress = calories / goal;
    if (progress < 0.25) {
      return "#ACF154";
    } else if (progress < 0.5) {
      return "#88E90E";
    } else if (progress < 0.75) {
      return "#6ED61C";
    } else if (progress <= 1.1) {
      return "#2ECD15";
    } else {
      return "#E9C924";
    }
  };

  return (
    <Fragment>
      <View>
        <ProgressCircle
          style={styles.progressCircle}
          progress={calories / goal}
          progressColor={progressChartColor()}
          backgroundColor="#D8D8D8"
          strokeWidth={16}
        />
        <View style={styles.progrressCircleLabelContainer}>
          <Text
            style={[
              styles.progressCircleLabel,
              { color: progressChartColor() },
            ]}
          >
            {Math.round((calories / goal) * 100)}%
          </Text>
        </View>
      </View>
      <Text style={styles.progressText}>
        {calories} of {goal} kcal
      </Text>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  progressCircle: {
    marginVertical: 30,
    height: 180,
  },
  progrressCircleLabelContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleLabel: {
    fontSize: 36,
    fontWeight: "bold",
  },
  progressText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
});

export default CalorieProgressCircle;
