import { getRoutine, updateRoutine } from "./Routine";
import { Routine, Set, UserSettings } from "../interfaces";
import { getExerciseInstance } from "./ExerciseInstance";
import { v4 } from "uuid";

export const getSets = async (
  routineId: string
): Promise<Array<Set> | undefined> => {
  const data = await getRoutine(routineId);
  if (data) {
    return data.workouts.map((w) => w.exercises.map((e) => e.sets)).flat(2);
  }
};

export const getSetsByExerciseInstance = async (
  exerciseInstanceId: string,
  routineId: string
) => {
  const exerciseInstance = await getExerciseInstance(
    exerciseInstanceId,
    routineId
  );
  if (exerciseInstance) {
    return exerciseInstance.sets;
  }
};

export const getSetsById = async (ids: Array<string>, routineId: string) => {
  const sets = await getSets(routineId);
  if (sets) {
    return sets.filter((set) => ids.includes(set.id));
  }
};

export const addSet = async (
  exerciseInstanceId: string,
  set: Set,
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
            if (e.id === exerciseInstanceId) {
              return { ...e, sets: [...e.sets, set] };
            }
            return e;
          }),
        };
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};

export const updateSet = async (
  setId: string,
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
            return {
              ...e,
              sets: e.sets.map((s) => {
                if (s.id === setId) {
                  return {
                    ...s,
                    [field]: item,
                  };
                }
                return s;
              }),
            };
          }),
        };
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};

export const deleteSet = async (setId: string, routineId: string) => {
  const routine = await getRoutine(routineId);
  if (routine) {
    const routineToSave = {
      ...routine,
      workouts: routine.workouts.map((w) => {
        return {
          ...w,
          exercises: w.exercises.map((e) => {
            return {
              ...e,
              sets: e.sets.reduce((acc, s) => {
                if (s.id !== setId) {
                  return [...acc, s];
                }
                return acc;
              }, [] as Set[]),
            };
          }),
        };
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};

export const getInitialSetValuesForExerciseInstance = (
  routine: Routine,
  exerciseName: string,
  exerciseInstanceId: string,
  userSettings: UserSettings[]
): Set[] => {
  return [];
  const lowercaseName = exerciseName.toLowerCase();
  const pattern = routine.primaryPatterns.find((p) => p.name === lowercaseName);
  if (!pattern) return [];
  const weightFromUserSettings = userSettings.find(
    (s) => s.routineId === routine.id
  );
  if (weightFromUserSettings) {
    const sets: Set[] = pattern.setPatterns.map((p) => {
      return {
        reps: 0,
        goalReps: p.reps,
        weight:
          (weightFromUserSettings.exercises.find((e) => e.name === exerciseName)
            ?.weight || 0) * p.weightPercent,
        id: v4(),
        exerciseName,
        exerciseInstanceIdKey: exerciseInstanceId,
      };
    });
    return sets;
  }
  return [];
};
