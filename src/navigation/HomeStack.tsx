import "react-native-get-random-values";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Routine from "../screens/Routine";
import ExerciseInstance from "../screens/ExerciseInstance";
import Workout from "../screens/WorkoutInstance";
import { RootStackParamList } from "../interfaces";
import AddExercise from "../screens/AddExercise";
import AddWorkout from "../screens/AddWorkout";
import Timer from "../components/Timer";
import withRoutineContext from "../state/hoc/withRoutineContext";

const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackScreen = () => {
  const headerRight = () => <Timer />;
  return (
    <HomeStack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => {
          return { headerRight };
        }}
      />
      <Stack.Screen
        name="Routine"
        component={Routine}
        options={({ route }) => ({
          title: route.params.routine.name,
          headerRight,
        })}
      />
      <Stack.Screen
        name="Workout"
        component={Workout}
        options={() => {
          return { headerRight };
        }}
      />
      <Stack.Screen
        name="ExerciseInstance"
        component={ExerciseInstance}
        options={({ route }) => ({
          title: route.params.exerciseInstance.name,
          headerRight,
        })}
      />
      <Stack.Screen
        name="AddExercise"
        component={AddExercise}
        options={() => ({
          title: "Add Exercises",
          headerRight,
        })}
      />
      <Stack.Screen
        name="AddWorkout"
        component={AddWorkout}
        options={() => {
          return { headerRight };
        }}
      />
    </HomeStack.Navigator>
  );
};

export default withRoutineContext(HomeStackScreen);
