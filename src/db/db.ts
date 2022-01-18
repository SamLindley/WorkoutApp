import AsyncStorageLib from "@react-native-async-storage/async-storage";
import Exercise from "../interfaces/ExerciseTemplate";
import Routine from "../interfaces/Routine";
import Set from "../interfaces/Set";
import Workout from "../interfaces/Workout";

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorageLib.setItem(key, value);
  } catch (e) {
    //TODO
  }
};

// export const getRoutines = (): Array<Routine> => fakeRoutineData;
// export const getRoutine = (id: string): Routine =>
//   Object.values(fakeRoutineData).filter((routine) => routine.id === id)[0];

// export const getWorkouts = (): Array<Workout> => fakeWorkoutData;
// export const getWorkout = (id: string): Workout =>
//   Object.values(fakeWorkoutData).filter((workout) => workout.id === id)[0];

// export const getExercises = (): Array<Exercise> => fakeExerciseData;
// export const getExercise = (id: string): Exercise =>
//   Object.values(fakeExerciseData).filter((exercise) => exercise.id === id)[0];
