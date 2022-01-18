import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Routine from "./src/screens/Routine";
import ExerciseInstance from "./src/screens/ExerciseInstance";
import Workout from "./src/screens/Workout";
import { RootStackParamList } from "./src/interfaces";
import AddExercise from "./src/screens/AddExercise";
import AddWorkout from "./src/screens/AddWorkout";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Routine"
            component={Routine}
            options={({ route }) => ({ title: route.params.routine.name })}
          />
          <Stack.Screen name="Workout" component={Workout} />
          <Stack.Screen
            name="ExerciseInstance"
            component={ExerciseInstance}
            options={({ route }) => ({
              title: route.params.exerciseInstance.name,
            })}
          />
          <Stack.Screen
            name="AddExercise"
            component={AddExercise}
            options={() => ({
              title: "Add Exercises",
            })}
          />
          <Stack.Screen name="AddWorkout" component={AddWorkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
