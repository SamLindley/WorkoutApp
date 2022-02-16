import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getLastXCompletedExerciseInstances } from "../db";
import { ExerciseInstance } from "../interfaces";

interface Props {
  name: string;
  routineId: string;
}

export default ({ name, routineId }: Props) => {
  const [history, setHistory] = useState([] as Array<ExerciseInstance>);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const pastInstances = await getLastXCompletedExerciseInstances(
          name,
          3,
          routineId
        );

        setHistory(pastInstances);
      };

      fetchData();
    }, [])
  );

  return (
    <View>
      {history.map((instance) => (
        <View>
          <Text>{instance.dateCompleted}</Text>
          <Text>{instance.name}</Text>
        </View>
      ))}
    </View>
  );
};
