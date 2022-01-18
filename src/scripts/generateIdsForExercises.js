// Will be used to generate IDs for exercise templates

const { v4 } = require("uuid");
const fs = require("fs");

const exercises = [
  { bodyPart: "chest", name: "Bench", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Incline Bench", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Dumbbell Bench", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Cable Flies High", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Push Ups", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Cable Flies Low", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Machine Press", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Machine Incline Press", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Dips", type: "Push", id: "2" },
  { bodyPart: "chest", name: "Decline Bench", type: "Push", id: "2" },

  { bodyPart: "legs", name: "Squats", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Lunges", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Leg Press", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Leg Curls", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Leg Extensions", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Calf Raises", type: "Push", id: "1" },
  { bodyPart: "legs", name: "RDL", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Pistol Squats", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Hip Thrusts", type: "Push", id: "1" },
  { bodyPart: "legs", name: "Front Squats", type: "Push", id: "1" },

  { bodyPart: "shoulders", name: "OHP", type: "Push", id: "3" },
  { bodyPart: "shoulders", name: "Side Lateral Raises", type: "Push", id: "3" },
  {
    bodyPart: "shoulders",
    name: "Front Lateral Raises",
    type: "Push",
    id: "3",
  },
  {
    bodyPart: "shoulders",
    name: "Seated Dumbell Shoulder Press",
    type: "Push",
    id: "3",
  },
  {
    bodyPart: "shoulders",
    name: "Dumbell Should Press",
    type: "Push",
    id: "3",
  },
  { bodyPart: "shoulders", name: "Rear Delt Flies", type: "Push", id: "3" },
  {
    bodyPart: "shoulders",
    name: "Cable Lateral Raises",
    type: "Push",
    id: "3",
  },
  {
    bodyPart: "shoulders",
    name: "Machine Shoulder Press",
    type: "Push",
    id: "3",
  },

  { bodyPart: "back", name: "Deadlift", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Sumo Deadlift", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Back Extensions", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Pendley Rows", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Bodybuilder Rows", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Seated Rows", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Lateral Pulldowns", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Pull Ups", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Chin Ups", type: "Pull", id: "4" },
  { bodyPart: "back", name: "Face Pulls", type: "Pull", id: "4" },

  { bodyPart: "triceps", name: "Close Grip Bench", type: "Push", id: "4" },
  { bodyPart: "triceps", name: "Face Crushers", type: "Push", id: "4" },
  { bodyPart: "triceps", name: "Cable Kickbacks", type: "Push", id: "4" },
  { bodyPart: "triceps", name: "Rope Pushdowns", type: "Push", id: "4" },
  { bodyPart: "triceps", name: "Bar Pushdowns", type: "Push", id: "4" },
  { bodyPart: "triceps", name: "Machine Pushdowns", type: "Push", id: "4" },

  { bodyPart: "biceps", name: "Standing Curls Normal", type: "Pull", id: "4" },
  { bodyPart: "biceps", name: "Standing Curls Wide", type: "Pull", id: "4" },
  { bodyPart: "biceps", name: "Dumbell Curls", type: "Pull", id: "4" },
  { bodyPart: "biceps", name: "Hammer Curls", type: "Pull", id: "4" },
  { bodyPart: "biceps", name: "Seated Hammer Curls", type: "Pull", id: "4" },
];

const exWithIds = exercises.map((exercise) => {
  return {
    ...exercise,
    id: v4(),
  };
});

const exerciseStringified = JSON.stringify(exWithIds);
fs.writeFile("exerciseTemplates.json", exerciseStringified, (err) => {
  console.log(err);
});
