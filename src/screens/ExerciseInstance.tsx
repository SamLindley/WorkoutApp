import React from "react";
import { View, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import SetComponent from "../components/Set";
import { Set } from "../interfaces";

interface Props {
  sets: Array<Set> | undefined;
  addSet: () => void;
  deleteSet: (id: string) => void;
  updateSet: (id: string, key: string, value: string) => void;
}

const ExerciseInstance = ({ sets, addSet, deleteSet, updateSet }: Props) => {
  const renderListItem: ListRenderItem<Set> = (props) => {
    return (
      <View>
        <SetComponent
          reps={props.item.reps}
          weight={props.item.weight}
          setId={props.item.id}
          updateSet={updateSet}
        />
        <Button onPress={() => onPressDelete(props.item.id)}>Delete</Button>
      </View>
    );
  };

  const onPress = () => {
    addSet();
  };

  const onPressDelete = (id: string) => {
    deleteSet(id);
  };

  return (
    <View>
      <FlatList data={sets} renderItem={renderListItem} />
      <Button onPress={onPress}>Add Set</Button>
    </View>
  );
};

export default ExerciseInstance;
