import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import { Title, Button } from "react-native-paper";
import WorkoutInstanceListItem from "../components/WorkoutInstanceListItem";
import { getExerciseInstancesById, getWorkout } from "../db/fakeDb";
import { ExerciseInstance, RootStackParamList } from "../interfaces";
import global from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

const Workout = ({ navigation, route }: Props) => {
  const [exercises, setExercises] = useState([] as Array<ExerciseInstance>);
  const [name, setName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const workout = getWorkout(route.params.workoutId);
      if (workout) {
        setExercises(getExerciseInstancesById(workout.exercises));
        setName(workout.name);
      }
    }, [])
  );

  const onClickAdd = () => {
    navigation.navigate("AddExercise", {
      workoutIdToAddTo: route.params.workoutId,
    });
  };

  const renderListItem: ListRenderItem<ExerciseInstance> = (props) => {
    return <WorkoutInstanceListItem exerciseInstance={props.item} />;
  };

  return (
    <View style={global.container}>
      <Title>{name}</Title>
      <Button onPress={onClickAdd}>Add Exercise</Button>
      {exercises.length > 0 ? (
        <FlatList data={exercises} renderItem={renderListItem} />
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
};

export default Workout;
