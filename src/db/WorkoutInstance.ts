import { WorkoutInstance } from "../interfaces";
import { getRoutine, updateRoutine } from "./Routine";

export const getWorkoutInstances = async (
  routineId: string
): Promise<Array<WorkoutInstance> | undefined> => {
  const data = await getRoutine(routineId);
  if (data) {
    return data.workouts;
  }
};

export const getWorkoutInstancesByRoutine = async (routineId: string) => {
  const routine = await getRoutine(routineId);
  if (routine && routine.workouts) {
    return routine.workouts;
  }
};

export const getWorkoutInstancesById = async (
  workoutIds: Array<string>,
  routineId: string
): Promise<Array<WorkoutInstance> | undefined> => {
  const workouts = await getWorkoutInstances(routineId);
  if (workouts) {
    return workouts.filter((workout: WorkoutInstance) =>
      workoutIds.includes(workout.id)
    );
  }
};

export const getWorkoutInstance = async (
  workoutId: string,
  routineId: string
) => {
  const workouts = await getWorkoutInstances(routineId);
  if (workouts) {
    return Object.values(workouts).find(
      (workout: WorkoutInstance) => workout.id === workoutId
    );
  }
};

export const addWorkout = async (
  routineId: string,
  workout: WorkoutInstance
) => {
  const routine = await getRoutine(routineId);
  const workoutInstances = routine?.workouts;
  if (routine && workoutInstances) {
    routine.workouts.push(workout);
    await updateRoutine(routineId, routine);
  }
};

export const updateWorkout = async (
  id: string,
  field: string,
  item: any,
  routineId: string
) => {
  const routine = await getRoutine(routineId);
  const workouts = routine?.workouts;
  if (workouts) {
    const routineToSave = {
      ...routine,
      workouts: workouts.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            [field]: item,
          };
        }
        return w;
      }),
    };
    await updateRoutine(routineId, routineToSave);
  }
};
