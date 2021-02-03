import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme, Surface, Text, Headline } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Macros } from "../screens/Dashboard";

interface Props {
  macros: Macros;
}

const MacrosGrid = ({ macros }: Props) => {
  return (
    <View style={styles.macronutrients}>
      <Headline style={styles.headline}>Today's macronutrients</Headline>
      <Grid style={styles.grid}>
        <Row style={styles.gridRow}>
          <Col style={styles.gridColumn}>
            <Surface style={styles.macroCard}>
              <Text style={[{ color: "#478DCD" }, styles.macroLabel]}>
                Protein
              </Text>
              <Text style={[{ color: "#478DCD" }, styles.macroNumber]}>
                {macros.protein}g
              </Text>
            </Surface>
          </Col>
          <Col style={styles.gridColumn}>
            <Surface style={styles.macroCard}>
              <Text style={[{ color: "#F5C139" }, styles.macroLabel]}>
                Carbohydrates
              </Text>
              <Text style={[{ color: "#F5C139" }, styles.macroNumber]}>
                {macros.carbs}g
              </Text>
            </Surface>
          </Col>
        </Row>
        <Row style={styles.gridRow}>
          <Col style={styles.gridColumn}>
            <Surface style={[styles.macroCard]}>
              <Text style={[{ color: "#20DA6A" }, styles.macroLabel]}>
                Fats
              </Text>
              <Text style={[{ color: "#20DA6A" }, styles.macroNumber]}>
                {macros.fats}g
              </Text>
            </Surface>
          </Col>
          <Col style={styles.gridColumn}>
            <Surface style={styles.macroCard}>
              <Text style={[{ color: "#8A4EEC" }, styles.macroLabel]}>
                Fiber
              </Text>
              <Text style={[{ color: "#8A4EEC" }, styles.macroNumber]}>
                {macros.fiber}g
              </Text>
            </Surface>
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 18,
    fontWeight: "bold",
  },
  macronutrients: {
    marginTop: 40,
  },
  grid: {
    marginTop: 10,
    marginBottom: 50,
  },
  gridRow: {
    paddingVertical: 5,
  },
  gridColumn: {
    paddingHorizontal: 5,
  },
  macroCard: {
    paddingVertical: 50,
  },
  macroLabel: {
    position: "absolute",
    top: 5,
    left: 10,
  },
  macroNumber: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default MacrosGrid;
