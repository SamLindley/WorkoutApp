import React from "react";
import RoutineContext, { RoutineContextProps } from "../context/RoutineContext";

const useRoutineContext = (): RoutineContextProps =>
  React.useContext(RoutineContext);
export default useRoutineContext;
