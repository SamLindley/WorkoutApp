import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, FlatList, ListRenderItem } from "react-native";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Routine } from "../interfaces";
import styles from "../styles";
import { RootStackParamList } from "../interfaces";
import { getRoutines } from "../db/fakeDb";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props): React.ReactElement => {
  const [routines, setRoutines] = useState([] as Array<Routine>);

  useEffect(() => {
    setRoutines(getRoutines());
  });

  const renderListItem: ListRenderItem<Routine> = (props) => {
    return (
      <Button
        onPress={() =>
          navigation.navigate("Routine", {
            routine: props.item,
          })
        }
      >
        {props.item.name}
      </Button>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Molly Tränar</Text>
      <Button
        icon="plus"
        mode="outlined"
        color="black"
        onPress={() => console.log("Hey!")}
      >
        Add Workout
      </Button>
      <FlatList data={routines} renderItem={renderListItem} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
