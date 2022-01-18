import React from "react";
import { Picker } from "react-native-wheel-pick";
import { View, StyleSheet, Dimensions } from "react-native";

interface Props {
  reps: string;
  weight: string;
  setId: string;
  updateSet: (id: string, key: string, value: string) => void;
}

const createWeightOptions = () => {
  const initialArray = [...Array(200).keys()];
  return initialArray
    .reduce((acc: number[], item) => {
      acc.push((item += 0.5));
      return acc;
    }, initialArray)
    .sort((a, b) => a - b);
};

const Set = ({ reps, weight, setId, updateSet }: Props) => {
  const onWeightUpdate = (e: string) => {
    updateSet(setId, "weight", e);
  };

  const onRepUpdate = (e: string) => {
    updateSet(setId, "reps", e);
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.inputContainer}>
        <View style={styles.wheelPickerContainer}>
          <Picker
            style={styles.wheelPicker}
            selectedValue={Number.parseInt(reps)}
            pickerData={[...Array(100).keys()]}
            onValueChange={(value: number) => {
              onRepUpdate(value.toString());
            }}
          />
        </View>
        <View style={styles.wheelPickerContainer}>
          <Picker
            style={styles.wheelPicker}
            selectedValue={Number.parseFloat(weight)}
            pickerData={createWeightOptions()}
            onValueChange={(value: number) => {
              onWeightUpdate(value.toString());
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Set;

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wheelPickerContainer: {
    width: 100,
    height: 50,
    overflow: "hidden",
  },
  wheelPicker: {
    backgroundColor: "white",
    bottom: 80,
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
