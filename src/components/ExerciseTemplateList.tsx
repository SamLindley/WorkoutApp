// Component for selecting Exercises when adding.
// Should be able to filter and create new

import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ListRenderItem,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { ExerciseTemplate } from "../interfaces";

interface Props {
  exerciseTemplates: Array<ExerciseTemplate>;
  selectedExercises: Array<string>;
  onCheck: (exercise: ExerciseTemplate) => void;
  onUncheck: (id: string) => void;
}

const ExerciseTemplateList = (props: Props) => {
  const renderListItem: ListRenderItem<ExerciseTemplate> = (itemProps) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.listItem,
          ...(props.selectedExercises.includes(itemProps.item.id) &&
            styles.selected),
        }}
        key={itemProps.item.id}
        onPress={() => {
          if (
            props.selectedExercises.some((exercise) => {
              return exercise === itemProps.item.id;
            })
          ) {
            props.onUncheck(itemProps.item.id);
          } else {
            props.onCheck(itemProps.item);
          }
        }}
      >
        <Text style={styles.listItemTitle}>{itemProps.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={props.exerciseTemplates}
      renderItem={renderListItem}
    />
  );
};

export default ExerciseTemplateList;

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    width: Dimensions.get("window").width,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "green",
  },
  listItemTitle: {
    flex: 1,
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
