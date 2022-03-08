import "react-native-get-random-values";
import { v4 } from "uuid";

import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ListRenderItem, View, FlatList, Text } from "react-native";
import groupBy from "lodash/groupBy";
import moment from "moment";
import {
  addExerciseToRoutineFromTemplate,
  getRoutine,
  getWorkoutInstancesById,
  getWorkoutInstancesByRoutine,
  getWorkoutTemplate,
} from "../db";
import {
  RootStackParamList,
  WorkoutInstance,
  WorkoutWeek,
} from "../interfaces";
import global from "../styles";
import RoutineListItem from "../components/RoutineListItem";
import withTimerContext from "../state/hoc/withTimerContext";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Routine">;

const RoutineScreen = ({ navigation, route }: Props) => {
  const [workouts, setWorkouts] = useState([] as Array<WorkoutInstance>);
  const {
    params: { routine },
  } = route;

  useFocusEffect(
    React.useCallback(() => {
      const setupScreen = async () => {
        try {
          const updatedRoutine = await getRoutine(routine.id);
          if (updatedRoutine) {
            const workoutInstances = await getWorkoutInstancesById(
              updatedRoutine.workouts.map((w) => w.id),
              routine.id
            );

            workoutInstances && setWorkouts(workoutInstances);
          }
        } catch (e) {
          console.log(e);
        }
      };
      setupScreen();
    }, [routine])
  );

  const addTemplateToRoutine = async (
    templateId: string,
    routineId: string
  ) => {
    const template = await getWorkoutTemplate(templateId);
    await addExerciseToRoutineFromTemplate(template, routineId);
    const workoutInstances = await getWorkoutInstancesByRoutine(routineId);
    workoutInstances && setWorkouts(workoutInstances);
  };

  const onClickCustom = () => {
    navigation.push("AddWorkout", { routineIdToAddTo: routine.id });
  };

  const onClickNext = async () => {
    // fetch latest version of routine
    const updatedRoutine = await getRoutine(routine.id);

    if (updatedRoutine) {
      const { cycle, workouts, id } = updatedRoutine;
      if (!workouts.length) {
        addTemplateToRoutine(cycle[0], id);
      } else {
        const workoutInstances = await getWorkoutInstancesByRoutine(id);

        const lastCompletedWorkoutThatWasPartOfCycle = workoutInstances
          ?.reverse()
          .find((workout) => {
            return cycle.includes(workout.templateId);
          });
        if (lastCompletedWorkoutThatWasPartOfCycle) {
          const indexOfCurrentCycleId = cycle.findIndex(
            (i) => i === lastCompletedWorkoutThatWasPartOfCycle.templateId
          );
          const nextCycleId = cycle[indexOfCurrentCycleId + 1] || cycle[0];
          addTemplateToRoutine(nextCycleId, id);
        }
      }
    }
  };

  const test = groupBy(workouts, (dt) => moment(dt.dateCompleted).week());
  const formattedData: Array<WorkoutWeek> = Object.entries(test).map(
    ([key, value]) => {
      return {
        week: key,
        workouts: value,
      };
    }
  );

  const renderWeekItem: ListRenderItem<WorkoutWeek> = (renderProps) => {
    return (
      <RoutineListItem navigation={navigation} workoutWeek={renderProps.item} />
    );
  };

  return (
    <View style={global.container}>
      <Text>Workouts</Text>
      <Button onPress={onClickCustom} title="Add Workout" />
      <Button onPress={onClickNext} title="Add Next" />
      <FlatList
        keyExtractor={() => v4()}
        data={formattedData.reverse()}
        renderItem={renderWeekItem}
      />
    </View>
  );
};

export default withTimerContext(RoutineScreen);
