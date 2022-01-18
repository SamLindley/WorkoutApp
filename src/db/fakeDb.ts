import { ExerciseInstance, ExerciseTemplate } from "../interfaces";
import { Routine, Set, WorkoutInstance, WorkoutTemplate } from "../interfaces";
import exWithIds from "../scripts/exerciseTemplates.json";

const fakeRoutineData: Array<Routine> = [
  {
    workouts: ["111", "222", "333"],
    name: "PPL",
    id: "111",
    workoutTemplates: ["1", "2", "3", "4", "5", "6"],
  },
  { workouts: ["444", "222", "333"], name: "nSuns", id: "222" },
];

const workoutTemplates: Array<WorkoutTemplate> = [
  {
    name: "PPL - Pull Day (DL)",
    exercises: [
      "f33df687-127c-499a-9236-ae41a6292fb0", // Deadlift
      "b0ec3e96-c552-43b8-8fce-3ece6d8567e0", // Seated Rows
      "69a3aefe-707d-4f93-8f68-6c8c6f28bf7e", // Face Pulls
      "41d7fecb-0d41-4e05-b41d-110feb6f8480", // Standing Curls Normal
      "af2ebd99-4tyf-4562-b789-d329c4c5174b", // Preacher Curls
    ],
    id: "1",
  },
  {
    name: "PPL - Push Day (OHP)",
    exercises: [
      "559efbdc-7d10-4e05-bca9-adac14ded5ca", // OHP
      "6af00c9f-db39-4129-bb1d-ed859b24c86c", // Side Lateral Raises
      "4f5ab578-d022-4c75-a351-03eac8e76315", // Bench
      "cdc40de4-150f-452c-b0c3-1b5db5005a81", // Incline Bench
      "f4c83da5-84d9-4249-99a7-2e5505077361", // Cable Kickbacks
    ],
    id: "2",
  },
  {
    name: "PPL - Leg Day 1",
    exercises: [
      "88c8fdcf-c69f-4aaf-97cd-1fab2f5bee7b", // Squats
      "d9581089-6fb0-4273-8fcc-e0f90168bd32", // Leg Press
      "7d09fff3-e4e9-4aa6-bf1b-21f24ae29058", // Leg Curls
      "74610ad6-af9a-4ca5-9b0e-dddf802e5691", // Calf Raises
    ],
    id: "3",
  },
  {
    name: "PPL - Pull Day (Rows)",
    exercises: [
      "7d58cd98-25cc-4048-ac94-cce4f7a2b064", // Pendley Rows
      "235c262b-f0be-43d5-a4a7-b478ac5ed5f0", // Lateral Pulldowns
      "69a3aefe-707d-4f93-8f68-6c8c6f28bf7e", // Face Pulls
      "af2ebd99-655d-4562-b789-d329c4c5174b", // Seated Hammer Curls
      "f61adac5-cf3e-42e4-8a82-bd26e0fd8b58", // Dumbell Curls
    ],
    id: "4",
  },
  {
    name: "PPL - Push Day (Bench)",
    exercises: [
      "4f5ab578-d022-4c75-a351-03eac8e76315", // Bench
      "9c7bc95b-09c6-4143-9db2-75b22a84c967", // Cable Flies High
      "2308fb97-50f4-4b02-86ca-8ec6e45eed75", // Dips
      "77332b42-2928-405f-8c59-be4756955bda", // Rope Pushdowns
      "609f2ee8-ae16-449a-9005-b6ba11f90360", // Face Crushers
      "4e4a4301-fcbc-461c-ba62-1a5c43988f31", // Rear Delt Flies
    ],
    id: "5",
  },
  {
    name: "PPL - Leg Day 2",
    exercises: [
      "88c8fdcf-c69f-4aaf-97cd-1fab2f5bee7b", // Squats
      "d9581089-6fb0-4273-8fcc-e0f90168bd32", // Leg Press
      "7d09fff3-e4e9-4aa6-bf1b-21f24ae29058", // Leg Curls
      "74610ad6-af9a-4ca5-9b0e-dddf802e5691", // Calf Raises
    ],
    id: "6",
  },
];

let fakeWorkoutData: Array<WorkoutInstance> = [];

const fakeExerciseData: Array<ExerciseTemplate> = exWithIds;

let fakeExerciseInstanceData: Array<ExerciseInstance> = [];

let fakeSetData: Array<Set> = [];

export const getRoutines = (): Array<Routine> => fakeRoutineData;
export const getRoutine = (id: string): Routine =>
  Object.values(fakeRoutineData).filter((routine) => routine.id === id)[0];

export const updateRoutine = (id: string, field: string, item: any) => {
  const index = getRoutines().findIndex((routine) => routine.id === id);
  fakeRoutineData[index] = {
    ...fakeRoutineData[index],
    [field]: item,
  };
};

export const getRoutineTemplates = (routineId: string) => {
  const workoutTemplates = getRoutine(routineId).workoutTemplates;
  if (workoutTemplates) {
    return getWorkoutTemplatesById(workoutTemplates);
  }
};

export const getWorkouts = (): Array<WorkoutInstance> => fakeWorkoutData;

export const getWorkoutTemplatesById = (
  workoutIds: Array<string>
): Array<WorkoutTemplate> => {
  return workoutTemplates.filter((w) => workoutIds.includes(w.id));
};

export const getWorkoutsById = (workoutIds: Array<string>) => {
  return fakeWorkoutData.filter((workout) => workoutIds.includes(workout.id));
};

export const getWorkout = (id: string): WorkoutInstance | undefined =>
  Object.values(fakeWorkoutData).find((workout) => workout.id === id);

export const addWorkout = (routineId: string, workout: WorkoutInstance) => {
  const workouts = getRoutine(routineId).workouts;
  workouts.push(workout.id);
  updateRoutine(routineId, "workouts", workouts);
  fakeWorkoutData.push(workout);
};

export const updateWorkout = (id: string, field: string, item: any) => {
  const index = getWorkouts().findIndex((workout) => workout.id === id);

  fakeWorkoutData[index] = {
    ...fakeWorkoutData[index],
    [field]: item,
  };
};

export const getExercises = (): Array<ExerciseTemplate> => fakeExerciseData;
export const getExercise = (id: string): ExerciseTemplate | undefined =>
  Object.values(fakeExerciseData).find((exercise) => exercise.id === id);

export const getExerciseInstance = (
  id: string
): ExerciseInstance | undefined => {
  return fakeExerciseInstanceData.find((eI) => eI.id === id);
};
export const getExerciseInstancesById = (
  ids: Array<string>
): Array<ExerciseInstance> => {
  return fakeExerciseInstanceData.filter((exerciseInstance) => {
    return ids.includes(exerciseInstance.id);
  });
};
export const getExerciseTemplatesById = (
  ids: Array<string>
): Array<ExerciseTemplate> => {
  return fakeExerciseData.filter((exerciseTemplate) => {
    return ids.includes(exerciseTemplate.id);
  });
};
export const getExerciseInstances = (): Array<ExerciseInstance> =>
  fakeExerciseInstanceData;

export const addExerciseInstance = (
  workoutId: string,
  exerciseInstance: ExerciseInstance
) => {
  // add to workout array
  const exercises = getWorkout(workoutId)?.exercises;
  exercises?.push(exerciseInstance.id);
  updateWorkout(workoutId, "exercises", exercises);
  fakeExerciseInstanceData.push(exerciseInstance);
};

export const addExerciseInstances = (
  workoutId: string,
  exerciseInstances: Array<ExerciseInstance>
) => {
  exerciseInstances.forEach((exercise) => {
    addExerciseInstance(workoutId, exercise);
  });
};

export const getSets = (): Array<Set> => fakeSetData;

export const getSetsByExerciseInstance = (exerciseInstanceId: string) => {
  const setIds = getExerciseInstance(exerciseInstanceId)?.sets;
  if (setIds) return getSetsById(setIds);
};

export const getSetsById = (ids: Array<string>) => {
  return fakeSetData.filter((set) => ids.includes(set.id));
};

export const addSet = (exerciseInstanceId: string, set: Set) => {
  const sets = getExerciseInstance(exerciseInstanceId)?.sets;
  sets?.push(set.id);
  updateExerciseInstance(exerciseInstanceId, "sets", sets);
  fakeSetData.push(set);
};

export const updateSet = (setId: string, field: string, item: any) => {
  const index = getSets().findIndex((set) => set.id === setId);
  fakeSetData[index] = {
    ...fakeSetData[index],
    [field]: item,
  };
};

export const deleteSet = (setId: string, exerciseInstanceId: string) => {
  fakeSetData = fakeSetData.filter((set) => set.id !== setId);

  const oldExercise = getExerciseInstance(exerciseInstanceId);
  if (oldExercise) {
    const newExercise: ExerciseInstance = {
      ...oldExercise,
      sets: oldExercise?.sets.filter((set) => set !== setId),
    };
    const index = getExerciseInstances().findIndex(
      (exercise) => exercise.id === exerciseInstanceId
    );
    fakeExerciseInstanceData[index] = newExercise;
  }
};

export const deleteExerciseInstance = (
  exerciseId: string,
  workoutId: string
) => {
  fakeExerciseInstanceData = fakeExerciseInstanceData.filter(
    (instance) => instance.id !== exerciseId
  );
  const oldWorkout = getWorkout(workoutId);
  if (oldWorkout) {
    const newWorkout: WorkoutInstance = {
      ...oldWorkout,
      exercises: oldWorkout.exercises.filter(
        (exercise) => exercise !== exerciseId
      ),
    };
    const index = getWorkouts().findIndex(
      (workout) => workout.id === workoutId
    );
    fakeWorkoutData[index] = newWorkout;
  }
};

export const deleteWorkout = () => {};

export const updateExerciseInstance = (
  id: string,
  field: string,
  item: any
) => {
  const index = getExerciseInstances().findIndex(
    (exerciseInstance) => exerciseInstance.id === id
  );
  fakeExerciseInstanceData[index] = {
    ...fakeExerciseInstanceData[index],
    [field]: item,
  };
};
