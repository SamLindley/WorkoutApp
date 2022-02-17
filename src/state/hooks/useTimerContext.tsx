import React from "react";
import TimerContext, { TimerContextProps } from "../context/TimerContext";

const useTimerContext = (): TimerContextProps => React.useContext(TimerContext);
export default useTimerContext;
