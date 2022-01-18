import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { v4 } from "uuid";
import {
  addSet,
  deleteSet,
  getSetsByExerciseInstance,
  updateSet,
} from "../db/fakeDb";
import { ExerciseInstance, Set } from "../interfaces";
import ExerciseInstanceComponent from "../screens/ExerciseInstance";

interface WorkoutListItemProps {
  exerciseInstance: ExerciseInstance;
}

const WorkoutInstanceListItem = ({
  exerciseInstance,
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

  useEffect(() => {
    setSets(getSetsByExerciseInstance(exerciseInstance.id));
  }, []);

  return (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => setIsClosed(!isClosed)}>
        <Text>{exerciseInstance.name}</Text>
      </TouchableOpacity>
      {!isClosed && (
        <ExerciseInstanceComponent
          sets={sets}
          addSet={addSetToItem}
          deleteSet={deleteSetFromItem}
          updateSet={updateSetByKeyValue}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    width: Dimensions.get("window").width,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default WorkoutInstanceListItem;
