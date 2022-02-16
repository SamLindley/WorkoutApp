import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import ExerciseTemplateFilter from "../components/ExerciseTemplateFilter";
import ExerciseTemplateList from "../components/ExerciseTemplateList";
import { addExerciseInstances, getExerciseTemplates } from "../db";
import { RootStackParamList, ExerciseTemplate } from "../interfaces";
import global from "../styles";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "AddExercise">;

const AddExercise = ({ navigation, route }: Props) => {
  const [exerciseTemplates, setExerciseTemplates] = useState(
    [] as Array<ExerciseTemplate>
  );
  const [filterTerms, setFilterTerms] = useState([] as Array<string>);
  const [exercisesToAdd, setExercisesToAdd] = useState(
    [] as Array<ExerciseTemplate>
  );

  useEffect(() => {
    // filter exerciseTemplates based on filter
    const applyFilter = async () => {
      const exercises = await getExerciseTemplates();
      const filteredExercises = exercises?.filter((exercise) => {
        return filterTerms.includes(exercise.bodyPart);
      });
      if (filteredExercises?.length) {
        setExerciseTemplates(filteredExercises);
      } else if (exercises) setExerciseTemplates(exercises);
    };
    applyFilter();
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
          onPress={async () => {
            await addExerciseInstances(
              route.params.workoutIdToAddTo,
              exercisesToAdd.map((e) => {
                return {
                  ...e,
                  sets: [],
                  dateCompleted: null,
                  workoutIdKey: route.params.workoutIdToAddTo,
                  isPrimary: false,
                  templateIdKey: e.id,
                };
              }),
              "111"
            );
            navigation.navigate("Workout", {
              workoutId: route.params.workoutIdToAddTo,
            });
          }}
          title={`Add ${exercisesToAdd.length} Exercises`}
        />
      )}
    </View>
  );
};

export default AddExercise;
