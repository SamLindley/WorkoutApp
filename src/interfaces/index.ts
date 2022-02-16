// Exercises

export interface ExerciseTemplate {
  name: string;
  bodyPart: string;
  type: string;
  id: string;
}

export interface ExerciseInstance extends ExerciseTemplate {
  sets: Array<Set>;
  dateCompleted: Date | null;
  workoutIdKey: string;
  isPrimary: boolean;
  templateIdKey: string;
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

interface PrimaryPattern {
  name: string;
  increment: number;
  setPatterns: {
    reps: number;
    weightPercent: number;
    required?: boolean;
  }[];
}

// Sets

export interface Set {
  reps: string;
  weight: string;
  id: string;
  exerciseInstanceIdKey: string;
  exerciseName: string;
  goalReps: string;
  isPrimary: boolean;
  required: boolean;
}

// Workouts

export interface WorkoutTemplate {
  name: string;
  firstIsPrimary: boolean;
  exercises: Array<string>;
  id: string;
}

export interface WorkoutInstance {
  dateCompleted: Date | null;
  templateId: string;
  name: string;
  firstIsPrimary: boolean;
  exercises: Array<ExerciseInstance>;
  id: string;
}

export interface WorkoutWeek {
  week: string;
  workouts: Array<WorkoutInstance>;
}

// user

export interface UserSettings {
  routineId: string;
  exercises: { weight: number; name: string }[];
}

// Routine

export interface Routine {
  name: string;
  workouts: Array<WorkoutInstance>;
  id: string;
  workoutTemplates?: Array<string>;
  cycle: Array<string>;
  primaryPatterns: PrimaryPattern[];
}
