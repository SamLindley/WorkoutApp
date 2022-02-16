import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  ListRenderItem,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import moment from "moment";
import "react-native-get-random-values";
import { v4 } from "uuid";
import {
  RootStackParamList,
  WorkoutInstance,
  WorkoutWeek,
} from "../interfaces";
import global from "../styles";

interface RoutineListItemProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Routine">;
  workoutWeek: WorkoutWeek;
}

const getDateRange = (workoutWeek: WorkoutWeek): string => {
  if (!workoutWeek.workouts[0].dateCompleted) return "Up Next";

  return `${moment(workoutWeek.workouts[0].dateCompleted)
    .startOf("week")
    .format("DD[/]MM")} - ${moment(workoutWeek.workouts[0].dateCompleted)
    .endOf("week")
    .format("DD[/]MM")}`;
};

const RoutineListItem = (props: RoutineListItemProps) => {
  const [isClosed, setIsClosed] = useState(false);
  const renderWorkoutItem: ListRenderItem<WorkoutInstance> = (renderProps) => {
    return (
      <TouchableOpacity
        style={{ ...global.listItem, paddingVertical: 5 }}
        onPress={() => {
          props.navigation.push("Workout", {
            workoutId: renderProps.item.id,
          });
        }}
      >
        <Text style={global.listTitle}>{renderProps.item.name}</Text>
        <Ionicons name={"ios-chevron-forward"} size={24} color="black" />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TouchableOpacity
        style={{ ...global.listItemHeader, marginTop: 10 }}
        onPress={() => {
          setIsClosed(!isClosed);
        }}
      >
        <Text style={{ ...global.listTitle, fontWeight: "bold" }}>
          {getDateRange(props.workoutWeek)}
        </Text>
      </TouchableOpacity>
      {!isClosed && (
        <FlatList
          key={v4()}
          data={
            // if not completed we want them from earliest first
            props.workoutWeek.workouts[0].dateCompleted
              ? props.workoutWeek.workouts.reverse()
              : props.workoutWeek.workouts
          }
          renderItem={renderWorkoutItem}
        />
      )}
    </View>
  );
};

export default RoutineListItem;
