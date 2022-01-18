// Exercises

export interface ExerciseTemplate {
  name: string;
  bodyPart: string;
  type: string;
  id: string;
}

export interface ExerciseInstance extends ExerciseTemplate {
  sets: Array<string>;
  date: Date;
}

// Navigation

export type RootStackParamList = {
  Home: undefined;
  Routine: { routine: Routine };
  Workout: { workoutId: string };
  ExerciseInstance: { exerciseInstance: ExerciseInstance };
  AddExercise: { workoutIdToAddTo: string };
  AddWorkout: { routineIdToAddTo: string };
};

// Routines

export interface Routine {
  name: string;
  workouts: Array<string>;
  id: string;
  workoutTemplates?: Array<string>;
}

// Sets

export interface Set {
  reps: string;
  weight: string;
  id: string;
}

// Workouts

export interface WorkoutTemplate {
  name: string;
  exercises: Array<string>;
  id: string;
}

export interface WorkoutInstance extends WorkoutTemplate {
  date: Date;
}
