import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ListRenderItem,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Title } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { getWorkoutsById } from "../db/fakeDb";
import { RootStackParamList, WorkoutInstance } from "../interfaces";
import global from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "Routine">;

const RoutineScreen = ({ navigation, route }: Props) => {
  const [workouts, setWorkouts] = useState([] as Array<WorkoutInstance>);
  const {
    params: { routine },
  } = route;

  useFocusEffect(
    React.useCallback(() => {
      setWorkouts(getWorkoutsById(routine.workouts));
    }, [])
  );

  const onClick = () => {
    navigation.push("AddWorkout", { routineIdToAddTo: routine.id });
  };

  const renderListItem: ListRenderItem<WorkoutInstance> = (props) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.push("Workout", {
            workoutId: props.item.id,
          });
        }}
      >
        <Text>{props.item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={global.container}>
      <Title>Workouts</Title>
      <Button onPress={onClick}>Add Workout</Button>
      {workouts.length > 0 ? (
        <FlatGrid
          itemDimension={100}
          data={workouts.reverse()}
          renderItem={renderListItem}
        />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 100,
    backgroundColor: "pink",
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});

export default RoutineScreen;
