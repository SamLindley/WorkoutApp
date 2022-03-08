import "react-native-get-random-values";
import { getRoutine, updateRoutine } from "./Routine";
import { ExerciseInstance, WorkoutTemplate } from "../interfaces";
import { v4 } from "uuid";
import { getExerciseTemplatesById } from "./ExerciseTemplate";
import { getUserSettings } from "./db";
import { addWorkout } from "./WorkoutInstance";
import { getInitialSetValuesForExerciseInstance } from "./Sets";

export const getExerciseInstances = async (
  routineId: string
): Promise<Array<ExerciseInstance> | undefined> => {
  const data = await getRoutine(routineId);
  if (data) {
    return data.workouts
      .map((w) => {
        return w.exercises;
      })
      .flat();
  }
};

export const getExerciseInstance = async (
  exerciseId: string,
  routineId: string
): Promise<ExerciseInstance | undefined> => {
  const exerciseInstances = await getExerciseInstances(routineId);
  if (exerciseInstances) {
    return exerciseInstances.find((eI) => eI.id === exerciseId);
  }
};
export const getExerciseInstancesById = async (
  exerciseIds: Array<string>,
  routineId: string
): Promise<Array<ExerciseInstance> | undefined> => {
  const exercises = await getExerciseInstances(routineId);
  if (exercises) {
    return exercises.filter((exerciseInstance) => {
      return exerciseIds.includes(exerciseInstance.id);
    });
  }
};

export const addExerciseInstances = async (
  workoutId: string,
  exerciseInstances: ExerciseInstance[],
  routineId: string
) => {
  // add to workout array
  const routine = await getRoutine(routineId);
  if (routine) {
    const routineToSave = {
      ...routine,
      workouts: routine.workouts.map((w) => {
        if (w.id === workoutId) {
          return {
            ...w,
            exercises: w.exercises.concat(exerciseInstances),
          };
        }
        return w;
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};

export const deleteExerciseInstance = async (
  exerciseId: string,
  routineId: string
) => {
  const routine = await getRoutine(routineId);
  if (routine) {
    const routineToSave = {
      ...routine,
      workouts: routine.workouts.map((w) => {
        return {
          ...w,
          exercises: w.exercises.reduce((acc, e) => {
            if (e.id !== exerciseId) {
              return [...acc, e];
            }
            return acc;
          }, [] as ExerciseInstance[]),
        };
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};

export const updateExerciseInstance = async (
  idsToUpdate: string[],
  field: string,
  item: any,
  routineId: string
) => {
  const routine = await getRoutine(routineId);
  if (routine) {
    const routineToSave = {
      ...routine,
      workouts: routine.workouts.map((w) => {
        return {
          ...w,
          exercises: w.exercises.map((e) => {
            if (idsToUpdate.includes(e.id)) {
              return {
                ...e,
                [field]: item,
              };
            }
            return e;
          }),
        };
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};

export const addExerciseToRoutineFromTemplate = async (
  workoutTemplate: WorkoutTemplate,
  routineId: string
) => {
  const exerciseTemplates = await getExerciseTemplatesById(
    workoutTemplate.exercises
  );
  const routine = await getRoutine(routineId);
  const userSettings = await getUserSettings();

  if (exerciseTemplates && routine) {
    const workoutUUID = v4();

    await addWorkout(routineId, {
      ...workoutTemplate,
      exercises: exerciseTemplates.map((e, i): ExerciseInstance => {
        const exerciseInstanceId = v4();
        return {
          ...e,
          sets: getInitialSetValuesForExerciseInstance(
            routine,
            e.name,
            exerciseInstanceId,
            userSettings
          ),
          dateCompleted: null,
          workoutIdKey: workoutUUID,
          id: exerciseInstanceId,
          templateIdKey: e.id,
          isPrimary: workoutTemplate.firstIsPrimary && i === 0,
        };
      }),
      id: workoutUUID,
      dateCompleted: null,
      templateId: workoutTemplate.id,
    });
  }
};

export const getLastXCompletedExerciseInstances = async (
  exerciseName: string,
  amount: number,
  routineId: string
) => {
  const routine = await getRoutine(routineId);
  let foundInstances = [] as unknown as ExerciseInstance[];

  routine?.workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (
        exercise.name.toLowerCase() === exerciseName.toLowerCase() &&
        exercise.dateCompleted
      )
        foundInstances.push(exercise);
    });
  });

  return foundInstances
    .sort(
      (a, b) =>
        (b.dateCompleted ? new Date(b.dateCompleted).getTime() : 1) -
        (a.dateCompleted ? new Date(a.dateCompleted).getTime() : 1)
    )
    .slice(0, amount);
};
