import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Title, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import WorkoutInstanceListItem from "../components/WorkoutInstanceListItem";
import {
  getExerciseInstancesById,
  getWorkout,
  deleteExerciseInstance,
} from "../db/fakeDb";
import { ExerciseInstance, RootStackParamList } from "../interfaces";
import global from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

const Workout = ({ navigation, route }: Props) => {
  const [exercises, setExercises] = useState([] as Array<ExerciseInstance>);
  const [name, setName] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const workout = getWorkout(route.params.workoutId);
      if (workout) {
        setExercises(getExerciseInstancesById(workout.exercises));
        setName(workout.name);
      }
    }, [])
  );

  const onClickDeleteExercise = (exercise: ExerciseInstance) => {
    deleteExerciseInstance(exercise.id, exercise.workoutKey);
    const workout = getWorkout(route.params.workoutId);
    if (workout) {
      setExercises(getExerciseInstancesById(workout.exercises));
    }
  };

  const onClickAdd = () => {
    navigation.navigate("AddExercise", {
      workoutIdToAddTo: route.params.workoutId,
    });
  };

  const renderListItem: ListRenderItem<ExerciseInstance> = (props) => {
    return (
      <WorkoutInstanceListItem
        exerciseInstance={props.item}
        isEditingMode={isEditingMode}
        deleteExercise={onClickDeleteExercise}
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
        <Title>{name}</Title>
        <TouchableOpacity onPress={() => setIsEditingMode(!isEditingMode)}>
          {isEditingMode ? (
            <MaterialIcons name="edit-off" size={24} color="black" />
          ) : (
            <MaterialIcons name="edit" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Button onPress={onClickAdd}>Add Exercise</Button>
      {exercises.length > 0 && (
        <FlatList data={exercises} renderItem={renderListItem} />
      )}
    </View>
  );
};

export default Workout;
