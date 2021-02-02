import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  navigation: any;
}

const About = ({ navigation }: Props) => {
  return (
    <View style={styles.background}>
      <Text style={{ alignSelf: "center" }}>About us</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
});

export default About;
