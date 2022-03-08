import React from "react";

export interface RoutineContextProps {
  currentRoutineId: string;
  setCurrentRoutineId: (id: string) => void;
}

export default React.createContext<RoutineContextProps>({
  currentRoutineId: "",
  setCurrentRoutineId: () => {},
});
