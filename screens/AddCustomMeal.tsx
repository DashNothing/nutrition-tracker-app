import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { useDispatch } from "react-redux";
import { addCustomMeal } from "../redux/customMeals/actions";

import { Meal } from "../redux/types";

interface Props {
  navigation: any;
}

const AddCustomMeal = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [newMeal, setNewMeal] = useState<Meal>({
    name: "",
    amount: 100,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  });

  const addMeal = () => {
    dispatch(addCustomMeal(newMeal));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Add a meal template that you can use later.</Text>
      <TextInput
        mode="outlined"
        label="Meal name"
        onChangeText={(text: string) => setNewMeal({ ...newMeal, name: text })}
      />
      <TextInput
        mode="outlined"
        label="Calories"
        onChangeText={(text: string) =>
          setNewMeal({
            ...newMeal,
            calories: parseInt(text.replace(/[^0-9]/g, "")),
          })
        }
      />
      <TextInput
        mode="outlined"
        label="Protein"
        onChangeText={(text: string) =>
          setNewMeal({
            ...newMeal,
            protein: parseInt(text.replace(/[^0-9]/g, "")),
          })
        }
      />
      <TextInput
        mode="outlined"
        label="Carbohydrates"
        onChangeText={(text: string) =>
          setNewMeal({
            ...newMeal,
            carbs: parseInt(text.replace(/[^0-9]/g, "")),
          })
        }
      />
      <TextInput
        mode="outlined"
        label="Fats"
        onChangeText={(text: string) =>
          setNewMeal({
            ...newMeal,
            fats: parseInt(text.replace(/[^0-9]/g, "")),
          })
        }
      />
      <TextInput
        mode="outlined"
        label="Fiber"
        onChangeText={(text: string) =>
          setNewMeal({
            ...newMeal,
            fiber: parseInt(text.replace(/[^0-9]/g, "")),
          })
        }
      />
      <Button mode="contained" onPress={addMeal}>
        Save my meal
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default AddCustomMeal;
