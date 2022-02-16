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
  { term: "back", label: "Back" },
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
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: "green",
  },
});

export default ExerciseTemplateFilter;
