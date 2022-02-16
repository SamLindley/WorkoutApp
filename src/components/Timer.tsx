import React from "react";
import { View, Text } from "react-native";
import useTimerContext from "../state/hooks/useTimerContext";

const Timer = () => {
  const TimerContext = useTimerContext();
  const { seconds, minutes } = TimerContext.time;
  const addZerosToTimeIfNecessary = (time: number): string => {
    return time ? (time < 10 ? `0${time}` : time.toString()) : "00";
  };

  const formattedTime = `${addZerosToTimeIfNecessary(
    minutes
  )}:${addZerosToTimeIfNecessary(seconds)}`;
  return (
    <View>
      <Text>{formattedTime}</Text>
    </View>
  );
};

export default Timer;
