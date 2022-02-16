import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Title } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import WorkoutInstanceListItem from "../components/WorkoutInstanceListItem";
import {
  getExerciseInstancesById,
  getWorkoutInstance,
  deleteExerciseInstance,
  updateWorkout,
  updateExerciseInstance,
} from "../db";
import {
  ExerciseInstance,
  RootStackParamList,
  WorkoutInstance,
} from "../interfaces";
import global from "../styles";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

const Workout = ({ navigation, route }: Props) => {
  const [exercises, setExercises] = useState([] as Array<ExerciseInstance>);
  const [workout, setWorkout] = useState({} as WorkoutInstance);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const setupScreen = async () => {
        const workout = await getWorkoutInstance(route.params.workoutId, "111");
        if (workout) {
          const exercises = await getExerciseInstancesById(
            workout.exercises.map((e) => e.id),
            "111"
          );
          exercises && setExercises(exercises);
          setWorkout(workout);
        }
      };
      setupScreen();
    }, [])
  );

  const onClickDeleteExercise = async (exercise: ExerciseInstance) => {
    await deleteExerciseInstance(exercise.id, "111");
    const workout = await getWorkoutInstance(route.params.workoutId, "111");
    if (workout) {
      const exercises = await getExerciseInstancesById(
        workout.exercises.map((e) => e.id),
        "111"
      );
      exercises && setExercises(exercises);
      setWorkout(workout);
    }
  };

  const onClickAdd = () => {
    navigation.navigate("AddExercise", {
      workoutIdToAddTo: route.params.workoutId,
    });
  };

  const onClickComplete = async () => {
    const dateCompleted = new Date();
    await updateWorkout(
      route.params.workoutId,
      "dateCompleted",
      dateCompleted,
      "111"
    );

    await updateExerciseInstance(
      exercises.map((e) => e.id),
      "dateCompleted",
      dateCompleted,
      "111"
    );

    const workout = await getWorkoutInstance(route.params.workoutId, "111");
    if (workout) {
      const exercises = await getExerciseInstancesById(
        workout.exercises.map((e) => e.id),
        "111"
      );
      exercises && setExercises(exercises);
      setWorkout(workout);
    }
  };

  const renderListItem: ListRenderItem<ExerciseInstance> = (props) => {
    return (
      <WorkoutInstanceListItem
        exerciseInstance={props.item}
        isEditingMode={isEditingMode}
        deleteExercise={onClickDeleteExercise}
        key={props.item.id}
      />
    );
  };

  return (
    <View style={global.container}>
      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("screen").width,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <MaterialIcons name="edit" size={24} color="white" />
        <Title>{workout.name}</Title>
        {workout.dateCompleted && <Text>Completed</Text>}

        <TouchableOpacity onPress={() => setIsEditingMode(!isEditingMode)}>
          {isEditingMode ? (
            <MaterialIcons name="edit-off" size={24} color="black" />
          ) : (
            <MaterialIcons name="edit" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Button onPress={onClickAdd} title="Add Exercise" />
      {exercises.length > 0 && (
        <FlatList
          data={exercises}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button onPress={onClickComplete} title="Mark Complete" />
    </View>
  );
};

export default Workout;
