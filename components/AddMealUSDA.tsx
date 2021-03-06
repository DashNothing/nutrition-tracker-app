import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, FlatList, ListRenderItemInfo, Text } from "react-native";
import { withTheme, Searchbar, Snackbar } from "react-native-paper";
import ListItem from "../components/ListItem";

import { useDispatch } from "react-redux";

import { Meal } from "../redux/types";
import { addMeal } from "../redux/nutritionStats/actions";
import { Theme } from "react-native-paper/lib/typescript/types";
import AddMealDialog from "./AddMealDIalog";

const API_KEY = "WCsllB7f9m6qRwybiPba4f2IScSYGPzVyBWJAgUh";

type Props = {
  navigation: any;
  theme: Theme;
};

const AddMealUSDA = ({ navigation, theme }: Props) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedFoods, setFetchedFoods] = useState<Meal[]>([]);
  const [chosenMeal, setChosenMeal] = useState<Meal | null>(null);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const searchForFood = () => {
    if (searchQuery != "") {
      fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          dataType: ["Survey (FNDDS)"],
          sortBy: "score",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const fetchedMeals: Meal[] = data.foods.map((fdcFood: any) => {
            return {
              name: fdcFood.description,
              amount: 0,
              calories: fdcFood.foodNutrients.find(
                (n: any) => n.nutrientName == "Energy"
              ).value,
              protein: fdcFood.foodNutrients.find(
                (n: any) => n.nutrientName == "Protein"
              ).value,
              carbs: fdcFood.foodNutrients.find(
                (n: any) => n.nutrientName == "Carbohydrate, by difference"
              ).value,
              fats: fdcFood.foodNutrients.find(
                (n: any) => n.nutrientName == "Total lipid (fat)"
              ).value,
              fiber: fdcFood.foodNutrients.find(
                (n: any) => n.nutrientName == "Fiber, total dietary"
              ).value,
            };
          });
          setFetchedFoods(fetchedMeals);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleItemPress = (meal: Meal) => {
    setChosenMeal(meal);
    setDialogVisible(true);
  };

  const confirmDialog = (gramsInput: string) => {
    if (chosenMeal) {
      let meal: Meal = chosenMeal;
      meal.amount = parseInt(gramsInput);
      meal.calories = Math.round((meal.calories * meal.amount) / 100);
      meal.protein = Math.round((meal.protein * meal.amount) / 100);
      meal.carbs = Math.round((meal.carbs * meal.amount) / 100);
      meal.fats = Math.round((meal.fats * meal.amount) / 100);
      meal.fiber = Math.round((meal.fiber * meal.amount) / 100);

      dispatch(addMeal(meal));
      setDialogVisible(false);
      setSnackbarVisible(true);
    }
  };

  const handleDialogDismiss = () => {
    setDialogVisible(false);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<Meal>) => {
    return <ListItem meal={item} index={index} onPress={handleItemPress} />;
  };

  return (
    <Fragment>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        onIconPress={() => searchForFood()}
        onSubmitEditing={() => searchForFood()}
        style={styles.searchBar}
      />
      <FlatList
        data={fetchedFoods}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
      />
      <AddMealDialog
        visible={dialogVisible}
        onConfirm={confirmDialog}
        onDismiss={() => {
          handleDialogDismiss();
        }}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        Meal added to today's nutritional stats.
      </Snackbar>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    paddingVertical: 5,
  },
});

export default withTheme(AddMealUSDA);
