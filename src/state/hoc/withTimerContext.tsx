import React, { useEffect, useState } from "react";
import { convertSecondsToMinutes } from "../../utils";
import TimerContext from "../context/TimerContext";

const withTimerContext = (Component: any) => (props: any) => {
  const [seconds, setSeconds] = useState(undefined as unknown as number);
  const [secondsLeft, setSecondsLeft] = useState(
    undefined as unknown as number
  );
  const [startDate, setStartDate] = useState(undefined as unknown as number);
  const resetTimer = () => {
    setSeconds(0);
  };

  const startTimer = (seconds: number) => {
    setSeconds(seconds);
    setStartDate(Date.now());
    setSecondsLeft(seconds);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeElapsed = Date.now() - startDate;
      setSecondsLeft((prevTime) => {
        if (prevTime > 1) {
          return seconds - Math.floor(timeElapsed / 1000);
        }
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [seconds, startDate, secondsLeft]);

  return (
    <TimerContext.Provider
      value={{
        time: convertSecondsToMinutes(secondsLeft),
        resetTimer,
        startTimer,
      }}
    >
      <Component {...props} />
    </TimerContext.Provider>
  );
};

export default withTimerContext;
