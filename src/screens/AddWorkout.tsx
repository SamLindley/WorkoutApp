import React, { useEffect, useState } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import global from "../styles";
import {
  addExerciseInstances,
  addWorkout,
  getExerciseTemplatesById,
  getRoutine,
  getWorkoutTemplatesByRoutineId,
} from "../db";
import { RootStackParamList, WorkoutTemplate } from "../interfaces";
import WorkoutTemplateItem from "../components/WorkoutTemplateItem";

type Props = NativeStackScreenProps<RootStackParamList, "AddWorkout">;

const AddWorkout = (props: Props) => {
  const [templates, setTemplates] = useState([] as Array<WorkoutTemplate>);
  useEffect(() => {
    const apiCall = async () => {
      const templates = await getWorkoutTemplatesByRoutineId(
        props.route.params.routineIdToAddTo
      );
      if (templates) {
        setTemplates(templates);
      }
    };
    apiCall();
  }, []);

  const renderListItem: ListRenderItem<WorkoutTemplate> = (itemProps) => {
    const name = itemProps.item.name;
    const onSelect = async () => {
      const exercises = await getExerciseTemplatesById(
        itemProps.item.exercises
      );

      if (exercises) {
        const workoutUUID = v4();
        await addWorkout(props.route.params.routineIdToAddTo, {
          ...itemProps.item,
          exercises: [],
          id: workoutUUID,
          dateCompleted: null,
          templateId: itemProps.item.id,
        });
        await addExerciseInstances(
          workoutUUID,
          exercises.map((e) => {
            return {
              ...e,
              sets: [],
              dateCompleted: null,
              workoutIdKey: workoutUUID,
              id: v4(),
              isPrimary: false,
              templateIdKey: e.id,
            };
          }),
          "111"
        );
        const routine = await getRoutine(props.route.params.routineIdToAddTo);
        if (routine) {
          props.navigation.navigate("Routine", {
            routine,
          });
        }
      }
    };
    return (
      <WorkoutTemplateItem
        exerciseIds={itemProps.item.exercises}
        name={name}
        onSelect={onSelect}
        key={itemProps.item.id}
      />
    );
  };

  return (
    <View style={global.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        data={templates}
        renderItem={renderListItem}
      />
    </View>
  );
};

export default AddWorkout;
