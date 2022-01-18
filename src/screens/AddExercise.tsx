import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import ExerciseTemplateFilter from "../components/ExerciseTemplateFilter";
import ExerciseTemplateList from "../components/ExerciseTemplateList";
import { addExerciseInstances, getExercises } from "../db/fakeDb";
import { RootStackParamList, ExerciseTemplate } from "../interfaces";
import global from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "AddExercise">;

const AddExercise = ({ navigation, route }: Props) => {
  const [exerciseTemplates, setExerciseTemplates] = useState(getExercises);
  const [filterTerms, setFilterTerms] = useState([] as Array<string>);
  const [exercisesToAdd, setExercisesToAdd] = useState(
    [] as Array<ExerciseTemplate>
  );

  useEffect(() => {
    // filter exerciseTemplates based on filter
    const exercises = getExercises();
    const filteredExercises = exercises.filter((exercise) => {
      return filterTerms.includes(exercise.bodyPart);
    });
    if (filteredExercises.length) {
      setExerciseTemplates(filteredExercises);
    } else setExerciseTemplates(exercises);
  }, [filterTerms]);

  const onFilterAdd = (term: string) => {
    return setFilterTerms([...filterTerms, term]);
  };

  const onFilterRemove = (term: string) => {
    const newFilter = filterTerms.filter((item) => {
      return item !== term;
    });
    setFilterTerms(newFilter);
  };

  const onExerciseChecked = (exercise: ExerciseTemplate) => {
    setExercisesToAdd([...exercisesToAdd, exercise]);
  };

  const onExerciseUnchecked = (exerciseId: string) => {
    const newExerciseList = exercisesToAdd.filter((item) => {
      return item.id !== exerciseId;
    });
    setExercisesToAdd(newExerciseList);
  };

  return (
    <View style={global.container}>
      <ExerciseTemplateFilter
        onAdd={onFilterAdd}
        onRemove={onFilterRemove}
        filterList={filterTerms}
      />
      <ExerciseTemplateList
        exerciseTemplates={exerciseTemplates}
        selectedExercises={exercisesToAdd.map((exercise) => exercise.id)}
        onCheck={onExerciseChecked}
        onUncheck={onExerciseUnchecked}
      />
      {exercisesToAdd.length > 0 && (
        <Button
          style={{
            backgroundColor: "green",
          }}
          onPress={() => {
            addExerciseInstances(
              route.params.workoutIdToAddTo,
              exercisesToAdd.map((e) => {
                return {
                  ...e,
                  sets: [],
                  date: new Date(),
                  workoutKey: route.params.workoutIdToAddTo,
                };
              })
            );
            navigation.navigate("Workout", {
              workoutId: route.params.workoutIdToAddTo,
            });
          }}
        >
          Add {exercisesToAdd.length} Exercises
        </Button>
      )}
    </View>
  );
};

export default AddExercise;
