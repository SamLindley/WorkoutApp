import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ListRenderItem,
  FlatList,
} from "react-native";
import Button from "../components/Button";
import { getExerciseTemplatesById } from "../db";
import { ExerciseTemplate } from "../interfaces";
import global from "../styles";

interface Props {
  onSelect: () => void;
  exerciseIds: Array<string>;
  name: string;
}

const WorkoutTemplateItem = ({ exerciseIds, onSelect, name }: Props) => {
  const [isClosed, setIsClosed] = useState(true);
  const [exercises, setExercises] = useState([] as Array<ExerciseTemplate>);

  useEffect(() => {
    const setupComponent = async () => {
      const exercises = await getExerciseTemplatesById(exerciseIds);
      exercises && setExercises(exercises);
    };
    setupComponent();
  }, []);

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
          <Button onPress={onSelect} title="Add workout" />
        </View>
      )}
    </View>
  );
};

export default WorkoutTemplateItem;
