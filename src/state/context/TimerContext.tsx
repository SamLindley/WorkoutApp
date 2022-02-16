import React from "react";

export type TimerContextProps = {
  time: {
    seconds: number;
    minutes: number;
  };
  resetTimer: () => void;
  startTimer: (seconds: number) => void;
};

export default React.createContext<TimerContextProps>({
  time: {
    seconds: 0,
    minutes: 0,
  },
  resetTimer: () => {},
  startTimer: () => {},
});
