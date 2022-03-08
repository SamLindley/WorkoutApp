import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/screens/Home";
import Routine from "./src/screens/Routine";
import ExerciseInstance from "./src/screens/ExerciseInstance";
import Workout from "./src/screens/WorkoutInstance";
import { RootStackParamList } from "./src/interfaces";
import AddExercise from "./src/screens/AddExercise";
import AddWorkout from "./src/screens/AddWorkout";
import Settings from "./src/screens/Settings";
import withTimerContext from "./src/state/hoc/withTimerContext";
import Timer from "./src/components/Timer";
import withRoutineContext from "./src/state/hoc/withRoutineContext";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
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
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="App" component={withRoutineContext(HomeStackScreen)} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default withTimerContext(App);
