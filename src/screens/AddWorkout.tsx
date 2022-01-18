import React, { useEffect, useState } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import global from "../styles";
import {
  addExerciseInstances,
  addWorkout,
  getExerciseTemplatesById,
  getRoutine,
  getRoutineTemplates,
} from "../db/fakeDb";
import { RootStackParamList, WorkoutTemplate } from "../interfaces";
import WorkoutTemplateItem from "../components/WorkoutTemplateItem";
import { v4 } from "uuid";

type Props = NativeStackScreenProps<RootStackParamList, "AddWorkout">;

const AddWorkout = (props: Props) => {
  const [templates, setTemplates] = useState([] as Array<WorkoutTemplate>);
  useEffect(() => {
    const templates = getRoutineTemplates(props.route.params.routineIdToAddTo);
    if (templates) {
      setTemplates(templates);
    }
  }, []);

  const renderListItem: ListRenderItem<WorkoutTemplate> = (itemProps) => {
    const exercises = getExerciseTemplatesById(itemProps.item.exercises);
    const name = itemProps.item.name;
    const onSelect = () => {
      const workoutUUID = v4();
      const date = new Date();
      addWorkout(props.route.params.routineIdToAddTo, {
        ...itemProps.item,
        id: workoutUUID,
        date,
      });
      // updateWorkout(workoutUUID, "exercises", itemProps.item.exercises);
      addExerciseInstances(
        workoutUUID,
        exercises.map((e) => {
          return { ...e, sets: [], date, workoutKey: workoutUUID };
        })
      );
      props.navigation.navigate("Routine", {
        routine: getRoutine(props.route.params.routineIdToAddTo),
      });
    };
    return (
      <WorkoutTemplateItem
        exercises={exercises}
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
