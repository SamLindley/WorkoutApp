export const createWeightOptions = () => {
  const initialArray = [...Array(200).keys()];
  return initialArray
    .reduce((acc: number[], item) => {
      acc.push((item += 0.5));
      return acc;
    }, initialArray)
    .sort((a, b) => a - b);
};

export const convertSecondsToMinutes = (
  totalSeconds: number
): { minutes: number; seconds: number } => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = parseInt((totalSeconds % 60).toFixed(0));
  return { minutes, seconds };
};
