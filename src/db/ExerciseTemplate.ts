import { ExerciseTemplate } from "../interfaces";
import { getData } from "./db";

const EXERCISE_TEMPLATES = "EXERCISE_TEMPLATES";

export const getExerciseTemplates = async (): Promise<
  Array<ExerciseTemplate> | undefined
> => {
  const data = await getData(EXERCISE_TEMPLATES);
  if (data) {
    return JSON.parse(data);
  }
};

export const getExerciseTemplate = async (
  id: string
): Promise<ExerciseTemplate | undefined> => {
  const exercises = await getExerciseTemplates();
  if (exercises) {
    return Object.values(exercises).find((exercise) => exercise.id === id);
  }
};

export const getExerciseTemplatesById = async (
  ids: Array<string>
): Promise<Array<ExerciseTemplate> | undefined> => {
  const exerciseTemplates = await getExerciseTemplates();
  if (exerciseTemplates) {
    return exerciseTemplates.filter((exerciseTemplate) => {
      return ids.includes(exerciseTemplate.id);
    });
  }
};
