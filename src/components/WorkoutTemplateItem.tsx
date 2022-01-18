import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ListRenderItem,
  FlatList,
  Button,
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
      <View style={{ ...global.listItem, paddingVertical: 5 }}>
        <Text key={itemProps.item.id}>{itemProps.item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{ ...global.listItemHeader, paddingBottom: 20 }}>
        <TouchableOpacity onPress={() => setIsClosed(!isClosed)}>
          <Text style={global.listTitle}>{name}</Text>
        </TouchableOpacity>
      </View>
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
