import "react-native-get-random-values";
import { v4 } from "uuid";

import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ListRenderItem, View, FlatList, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
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
import ExerciseHistory from "../components/ExerciseHistory";

type Props = NativeStackScreenProps<RootStackParamList, "Routine">;

const RoutineScreen = ({ navigation, route }: Props) => {
  const [workouts, setWorkouts] = useState([] as Array<WorkoutInstance>);
  const [isLoading, setIsLoading] = useState(false);
  const {
    params: { routine },
  } = route;

  useFocusEffect(
    React.useCallback(() => {
      const setupScreen = async () => {
        setIsLoading(true);
        const updatedRoutine = await getRoutine(routine.id);
        if (updatedRoutine) {
          const workoutInstances = await getWorkoutInstancesById(
            updatedRoutine.workouts.map((w) => w.id),
            "111"
          );

          workoutInstances && setWorkouts(workoutInstances);
        }
        setIsLoading(false);
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

  const bottomSheetRef = useRef<BottomSheet>(null);

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

  const snapPoints = useMemo(() => ["10%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <ExerciseHistory name="Bench" routineId={routine.id} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default withTimerContext(RoutineScreen);
