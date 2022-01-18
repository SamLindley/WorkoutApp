import React from "react";
import Workout from "../interfaces/Workout";
import Exercise from "../interfaces/ExerciseTemplate";
import Routine from "../interfaces/Routine";

type contextProps = {
  routines: Array<Routine>;
  selectedRoutine: Routine;

  addExercise: (arg: Exercise) => void;
  addRoutine: (arg: Routine) => void;
  addWorkout: (arg: Workout) => void;
};

const AppContext = React.createContext<Partial<contextProps>>({
  routines: [],
  selectedRoutine: undefined,

  addExercise: (exercise: any) => {},
  addRoutine: (routine: any) => {},
  addWorkout: (workout: any) => {},
});
