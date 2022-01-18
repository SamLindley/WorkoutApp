import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ListRenderItem,
  FlatList,
  Button,
  Dimensions,
} from "react-native";
import { ExerciseTemplate } from "../interfaces";
import global from "../styles";

interface Props {
  onSelect: () => void;
  exercises: Array<ExerciseTemplate>;
  name: string;
}

const WorkoutTemplateItem = ({ exercises, onSelect, name }: Props) => {
  const [isClosed, setIsClosed] = useState(true);

  const renderListItem: ListRenderItem<ExerciseTemplate> = (itemProps) => {
    return (
      <View style={{ ...global.listItem, padding: 5 }}>
        <Text key={itemProps.item.id}>{itemProps.item.name}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 10,
        paddingTop: 20,
        width: Dimensions.get("window").width,
      }}
    >
      <TouchableOpacity onPress={() => setIsClosed(!isClosed)}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
      </TouchableOpacity>
      {!isClosed && (
        <View>
          <FlatList data={exercises} renderItem={renderListItem} />
          <Button onPress={onSelect} title="Add Workout" />
        </View>
      )}
    </View>
  );
};

export default WorkoutTemplateItem;
