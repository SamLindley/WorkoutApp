import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useRoutineContext from "../state/hooks/useRoutineContext";

import { addSet, deleteSet, getSetsByExerciseInstance, updateSet } from "../db";
import { ExerciseInstance, Set } from "../interfaces";
import ExerciseInstanceComponent from "../screens/ExerciseInstance";
import global from "../styles";
import RoutineListItem from "./RoutineListItem";

interface WorkoutListItemProps {
  exerciseInstance: ExerciseInstance;
  isEditingMode: boolean;
  deleteExercise: (exercise: ExerciseInstance) => void;
  onShowHistoryPressed: () => void;
}

const WorkoutInstanceListItem = ({
  exerciseInstance,
  isEditingMode,
  deleteExercise,
  onShowHistoryPressed,
}: WorkoutListItemProps) => {
  const [sets, setSets] = useState<Array<Set> | undefined>([]);
  const [isClosed, setIsClosed] = useState(true);
  const getPreviousWeight = () => {
    return sets?.pop()?.weight;
  };
  const RoutineContext = useRoutineContext();
  const { currentRoutineId } = RoutineContext;
  const addSetToItem = async () => {
    await addSet(
      exerciseInstance.id,
      {
        id: v4(),
        exerciseInstanceIdKey: exerciseInstance.id,
        exerciseName: exerciseInstance.name,
        weight: getPreviousWeight() || 0,
      } as Set,
      currentRoutineId
    );
    const sets = await getSetsByExerciseInstance(
      exerciseInstance.id,
      currentRoutineId
    );
    setSets(sets?.map((i) => i));
  };
  const deleteSetFromItem = async (setId: string) => {
    await deleteSet(setId, currentRoutineId);
    const sets = await getSetsByExerciseInstance(
      exerciseInstance.id,
      currentRoutineId
    );
    setSets(sets?.map((i) => i));
  };
  const updateSetByKeyValue = async (
    setId: string,
    key: string,
    value: string
  ) => {
    await updateSet(setId, key, value, currentRoutineId);
    const sets = await getSetsByExerciseInstance(
      exerciseInstance.id,
      currentRoutineId
    );
    setSets(sets?.map((i) => i));
  };

  const onPressDeleteExercise = () => {
    deleteExercise(exerciseInstance);
  };

  useEffect(() => {
    const setupComponent = async () => {
      const sets = await getSetsByExerciseInstance(
        exerciseInstance.id,
        currentRoutineId
      );
      setSets(sets?.map((i) => i));
    };
    setupComponent();
  }, []);

  return (
    <View style={{ ...global.listItem, flexDirection: "column" }}>
      <View style={{ ...global.listItemHeader, height: 30 }}>
        <TouchableOpacity
          onPress={() => setIsClosed(!isClosed)}
          style={global.collapsibleTitleWithIcon}
        >
          <Text style={global.listTitle}>{exerciseInstance.name}</Text>
          <Ionicons
            name={isClosed ? "ios-chevron-down" : "ios-chevron-up"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {exerciseInstance.isPrimary && <Text>Primary</Text>}
        {!isEditingMode && (
          <TouchableOpacity onPress={onShowHistoryPressed}>
            <MaterialIcons name="history" size={24} color="black" />
          </TouchableOpacity>
        )}

        {isEditingMode && (
          <TouchableOpacity onPress={onPressDeleteExercise}>
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
      {!isClosed && (
        <ExerciseInstanceComponent
          sets={sets}
          isEditingMode={isEditingMode}
          addSet={addSetToItem}
          deleteSet={deleteSetFromItem}
          updateSet={updateSetByKeyValue}
        />
      )}
    </View>
  );
};

export default WorkoutInstanceListItem;
