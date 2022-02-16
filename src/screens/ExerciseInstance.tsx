import React from "react";
import { View, FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import global from "../styles";
import SetComponent from "../components/Set";
import { Set } from "../interfaces";
import Button from "../components/Button";

interface Props {
  sets: Array<Set> | undefined;
  addSet: () => void;
  deleteSet: (id: string) => void;
  updateSet: (id: string, key: string, value: string) => void;
  isEditingMode: boolean;
}

const ExerciseInstance = ({
  sets,
  addSet,
  deleteSet,
  updateSet,
  isEditingMode,
}: Props) => {
  const renderListItem: ListRenderItem<Set> = (props) => {
    return (
      <View style={global.listItemHeader}>
        <SetComponent
          reps={props.item.reps}
          weight={props.item.weight}
          setId={props.item.id}
          updateSet={updateSet}
        />
        {isEditingMode && (
          <TouchableOpacity onPress={() => onPressDelete(props.item.id)}>
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
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
      <Button onPress={onPress} title="Add set" />
    </View>
  );
};

export default ExerciseInstance;
