import { WorkoutTemplate } from "../interfaces";
import { getData } from "./db";
import { getRoutine } from "./Routine";

const WORKOUT_TEMPLATES = "WORKOUT_TEMPLATES";

export const getWorkoutTemplatesByRoutineId = async (
  routineId: string
): Promise<Array<WorkoutTemplate> | undefined> => {
  const routine = await getRoutine(routineId);
  if (routine && routine.workoutTemplates) {
    return getWorkoutTemplatesById(routine.workoutTemplates);
  }
};

export const getWorkoutTemplate = async (id: string) => {
  const workoutTemplates = await getData(WORKOUT_TEMPLATES);
  if (workoutTemplates) {
    return JSON.parse(workoutTemplates).find((w: WorkoutTemplate) => {
      return w.id === id;
    });
  }
};

export const getWorkoutTemplatesById = async (
  workoutIds: Array<string>
): Promise<Array<WorkoutTemplate> | undefined> => {
  const workoutTemplates = await getData(WORKOUT_TEMPLATES);
  if (workoutTemplates) {
    return JSON.parse(workoutTemplates).filter((w: WorkoutTemplate) =>
      workoutIds.includes(w.id)
    );
  }
};
