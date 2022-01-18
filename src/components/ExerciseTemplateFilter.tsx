import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Props {
  onAdd: (term: string) => void;
  onRemove: (term: string) => void;
  filterList: Array<string>;
}

interface buttonValue {
  term: string;
  label: string;
}

const buttonValues = [
  { term: "chest", label: "Chest" },
  { term: "shoulders", label: "Shoulders" },
  { term: "legs", label: "Legs" },
  { term: "triceps", label: "Triceps" },
  { term: "biceps", label: "Biceps" },
];

const ExerciseTemplateFilter = (props: Props) => {
  const onPress = (term: string) => () => {
    if (props.filterList.includes(term)) {
      props.onRemove(term);
    } else {
      props.onAdd(term);
    }
  };

  const renderFilterButton = ({ term, label }: buttonValue) => {
    return (
      <TouchableOpacity
        onPress={onPress(term)}
        style={{
          ...styles.button,
          ...(props.filterList.includes(term) && styles.selected),
        }}
        key={term}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.buttonContainer}>
      {buttonValues.map(renderFilterButton)}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
  },
  button: {
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "green",
  },
});

export default ExerciseTemplateFilter;
