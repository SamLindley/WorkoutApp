import React, { useState } from "react";
import RoutineContext from "../context/RoutineContext";

export default (Component: any) => (props: any) => {
  const [routineId, setRoutineId] = useState("");

  return (
    <RoutineContext.Provider
      value={{
        currentRoutineId: routineId,
        setCurrentRoutineId: (id: string) => setRoutineId(id),
      }}
    >
      <Component {...props} />
    </RoutineContext.Provider>
  );
};
