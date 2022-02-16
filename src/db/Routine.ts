import { getData, storeData } from "./db";
import { Routine } from "../interfaces";

const ROUTINES = "ROUTINES";

export const getRoutines = async (): Promise<Array<Routine> | undefined> => {
  const data = await getData(ROUTINES);
  if (data) {
    return JSON.parse(data);
  }
};
export const getRoutine = async (id: string): Promise<Routine | undefined> => {
  const routines = await getRoutines();
  if (routines) {
    return Object.values(routines).filter((routine) => routine.id === id)[0];
  }
};

export const updateRoutine = async (id: string, routine: Routine) => {
  const routines = await getRoutines();
  if (routines) {
    const index = routines.findIndex((routine) => routine.id === id);
    routines[index] = routine;
    await storeData(ROUTINES, JSON.stringify(routines));
  }
};
