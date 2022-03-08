import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  FlatList,
  ListRenderItem,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import WorkoutInstanceListItem from "../components/WorkoutInstanceListItem";
import {
  getWorkoutInstance,
  deleteExerciseInstance,
  updateWorkout,
  updateExerciseInstance,
} from "../db";
import useRoutineContext from "../state/hooks/useRoutineContext";
import {
  ExerciseInstance,
  RootStackParamList,
  WorkoutInstance,
} from "../interfaces";
import global from "../styles";
import Button from "../components/Button";
import ExerciseHistory from "../components/ExerciseHistory";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

const Workout = ({ navigation, route }: Props) => {
  const [workout, setWorkout] = useState({} as WorkoutInstance);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [exerciseToShowHistoryOf, setExerciseToShowHistoryOf] = useState<
    string | null
  >(null as unknown as string);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%"], []);
  const { currentRoutineId } = useRoutineContext();

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const setupScreen = async () => {
        const workout = await getWorkoutInstance(
          route.params.workoutId,
          currentRoutineId
        );
        if (workout) {
          setWorkout(workout);
        }
      };
      setupScreen();
    }, [])
  );

  const onClickDeleteExercise = async (exercise: ExerciseInstance) => {
    await deleteExerciseInstance(exercise.id, currentRoutineId);
    const workout = await getWorkoutInstance(
      route.params.workoutId,
      currentRoutineId
    );
    if (workout) {
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
      currentRoutineId
    );

    // refactor to be in workout method
    await updateExerciseInstance(
      workout.exercises.map((e) => e.id),
      "dateCompleted",
      dateCompleted,
      currentRoutineId
    );

    const updatedWorkout = await getWorkoutInstance(
      route.params.workoutId,
      currentRoutineId
    );
    if (updatedWorkout) {
      setWorkout(updatedWorkout);
    }
  };

  const renderListItem: ListRenderItem<ExerciseInstance> = (props) => {
    return (
      <WorkoutInstanceListItem
        exerciseInstance={props.item}
        isEditingMode={isEditingMode}
        deleteExercise={onClickDeleteExercise}
        key={props.item.id}
        onShowHistoryPressed={() => setExerciseToShowHistoryOf(props.item.name)}
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
        <Text>{workout.name}</Text>
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
      {workout?.exercises?.length > 0 && (
        <FlatList
          data={workout.exercises}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button onPress={onClickComplete} title="Mark Complete" />
      {exerciseToShowHistoryOf && !isEditingMode && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View>
            <Text>Test Text 🎉</Text>
            <TouchableOpacity onPress={() => setExerciseToShowHistoryOf(null)}>
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <ExerciseHistory
              name={exerciseToShowHistoryOf}
              routineId={currentRoutineId}
            />
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

export default Workout;
