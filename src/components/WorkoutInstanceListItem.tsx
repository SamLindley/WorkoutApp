import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { v4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";

import {
  addSet,
  deleteSet,
  getSetsByExerciseInstance,
  updateSet,
} from "../db/fakeDb";
import { ExerciseInstance, Set } from "../interfaces";
import ExerciseInstanceComponent from "../screens/ExerciseInstance";
import global from "../styles";

interface WorkoutListItemProps {
  exerciseInstance: ExerciseInstance;
  isEditingMode: boolean;
  deleteExercise: (exercise: ExerciseInstance) => void;
}

const WorkoutInstanceListItem = ({
  exerciseInstance,
  isEditingMode,
  deleteExercise,
}: WorkoutListItemProps) => {
  const [sets, setSets] = useState<Array<Set> | undefined>([]);
  const [isClosed, setIsClosed] = useState(true);
  const addSetToItem = () => {
    addSet(exerciseInstance.id, { id: v4() } as Set);
    setSets(getSetsByExerciseInstance(exerciseInstance.id)?.map((i) => i));
  };
  const deleteSetFromItem = (setId: string) => {
    deleteSet(setId, exerciseInstance.id);
    setSets(getSetsByExerciseInstance(exerciseInstance.id)?.map((i) => i));
  };
  const updateSetByKeyValue = (setId: string, key: string, value: string) => {
    updateSet(setId, key, value);
    setSets(getSetsByExerciseInstance(exerciseInstance.id)?.map((i) => i));
  };

  const onPressDeleteExercise = () => {
    deleteExercise(exerciseInstance);
  };

  useEffect(() => {
    setSets(getSetsByExerciseInstance(exerciseInstance.id));
  }, []);

  return (
    <View style={{ ...global.listItem, flexDirection: "column" }}>
      <View style={{ ...global.listItemHeader, height: 30 }}>
        <TouchableOpacity onPress={() => setIsClosed(!isClosed)}>
          <Text style={global.listTitle}>{exerciseInstance.name}</Text>
        </TouchableOpacity>
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
