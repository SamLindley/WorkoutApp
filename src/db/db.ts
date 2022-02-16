import AsyncStorage from "@react-native-async-storage/async-storage";

import { ExerciseTemplate, Routine, UserSettings } from "../interfaces";
import { WorkoutTemplate } from "../interfaces";
import exWithIds from "../scripts/exerciseTemplates.json";

const ROUTINES = "ROUTINES";
const WORKOUT_TEMPLATES = "WORKOUT_TEMPLATES";
const EXERCISE_TEMPLATES = "EXERCISE_TEMPLATES";
const USER_SETTINGS = "USER_SETTINGS";

const userSettings: UserSettings[] = [
  {
    routineId: "111",
    exercises: [
      {
        name: "bench",
        weight: 30,
      },
      {
        name: "deadlift",
        weight: 50,
      },
      {
        name: "ohp",
        weight: 25,
      },
      {
        name: "squat",
        weight: 50,
      },
    ],
  },
];

const fakeRoutineData: Array<Routine> = [
  {
    workouts: [],
    name: "PPL",
    id: "111",
    workoutTemplates: ["1", "2", "3", "4", "5", "6", "7"],
    cycle: ["1", "2", "3", "4", "5", "6"],
    primaryPatterns: [
      {
        name: "bench",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
      {
        name: "deadlift",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
      {
        name: "ohp",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
      {
        name: "squat",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
    ],
  },
  {
    workouts: [],
    name: "Banan",
    id: "222",
    workoutTemplates: ["1", "2", "3", "4", "5", "6", "7"],
    cycle: ["1", "2", "3", "4", "5", "6"],
    primaryPatterns: [
      {
        name: "bench",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
      {
        name: "deadlift",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
      {
        name: "ohp",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
      {
        name: "squat",
        increment: 2.5,
        setPatterns: [
          { reps: 10, weightPercent: 0.5 },
          { reps: 8, weightPercent: 0.75 },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
          { reps: 5, weightPercent: 1, required: true },
        ],
      },
    ],
  },
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
    firstIsPrimary: true,
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
    firstIsPrimary: true,
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
    firstIsPrimary: true,
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
    firstIsPrimary: true,
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
    firstIsPrimary: true,
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
    firstIsPrimary: true,
  },
  {
    name: "Custom",
    exercises: [],
    id: "7",
    firstIsPrimary: false,
  },
];

const fakeExerciseData: Array<ExerciseTemplate> = exWithIds;

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async (key: string): Promise<string | undefined> => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return value;
  }
};

export const performSetup = async () => {
  AsyncStorage.clear();
  await storeData(ROUTINES, JSON.stringify(fakeRoutineData));
  await storeData(WORKOUT_TEMPLATES, JSON.stringify(workoutTemplates));
  await storeData(EXERCISE_TEMPLATES, JSON.stringify(fakeExerciseData));
  await storeData(USER_SETTINGS, JSON.stringify(userSettings));
};

export const getUserSettings = async () => {
  const data = await getData(USER_SETTINGS);
  if (data) {
    return JSON.parse(data);
  }
};
