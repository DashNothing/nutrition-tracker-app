import { sameDay, dateWithoutTime } from "../../utils/utils";
import {
  REMOVE_MEAL,
  LOAD_NUTRITION_STATS,
  ADD_MEAL,
  NutritionStatsActionTypes,
  NutritionStatsState,
  CREATE_EMPTY_NUTRITION_STAT,
} from "../nutritionStats/types";

const initialState: NutritionStatsState = [
  {
    date: dateWithoutTime(new Date()),
    meals: [
      {
        name: "Chicken soup",
        amount: 100,
        calories: 200,
        carbs: 17,
        protein: 20,
        fiber: 20,
        fats: 9,
      },
      {
        name: "Baked potatoes",
        amount: 50,
        calories: 140,
        carbs: 50,
        protein: 2,
        fiber: 40,
        fats: 23,
      },
    ],
  },
];

export default (
  nutritionStats: NutritionStatsState = initialState,
  action: NutritionStatsActionTypes
): NutritionStatsState => {
  switch (action.type) {
    case LOAD_NUTRITION_STATS:
      return action.payload;

    case CREATE_EMPTY_NUTRITION_STAT:
      console.log("Creating empty nutrition stat");
      return [
        ...nutritionStats,
        { date: dateWithoutTime(new Date()), meals: [] },
      ];

    case ADD_MEAL: {
      let newNutritionStats = [...nutritionStats];

      const todaysStat = newNutritionStats.find((stat) =>
        sameDay(stat.date, new Date())
      );

      if (todaysStat) {
        const todaysIndex = newNutritionStats.indexOf(todaysStat);
        todaysStat.meals.push(action.payload);
        newNutritionStats[todaysIndex] = todaysStat;
      }

      return newNutritionStats;
    }

    case REMOVE_MEAL: {
      let newNutritionStats = [...nutritionStats];

      let todaysStat = newNutritionStats.find((stat) =>
        sameDay(stat.date, new Date())
      );

      if (todaysStat) {
        const todaysIndex = newNutritionStats.indexOf(todaysStat);
        let newMeals = [...todaysStat.meals];
        newMeals.splice(action.payload, 1);

        todaysStat.meals = newMeals;

        newNutritionStats[todaysIndex] = todaysStat;
      }

      return newNutritionStats;
    }

    default:
      return nutritionStats;
  }
};
