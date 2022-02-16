import React from "react";
import TimerContext, { TimerContextProps } from "../context/TimerContext";

const useEttaContext = (): TimerContextProps => React.useContext(TimerContext);
export default useEttaContext;
