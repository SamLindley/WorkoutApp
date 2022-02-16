import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, FlatList, ListRenderItem } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Routine } from "../interfaces";
import global from "../styles";
import { RootStackParamList } from "../interfaces";
import { getRoutines, performSetup } from "../db";
import { useFocusEffect } from "@react-navigation/native";
import useTimerContext from "../state/hooks/useTimerContext";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props): React.ReactElement => {
  const [routines, setRoutines] = useState([] as Array<Routine>);
  const TimerContext = useTimerContext();

  useFocusEffect(
    useCallback(() => {
      const screenSetup = async () => {
        await performSetup();
        const routines = await getRoutines();
        if (routines) {
          setRoutines(routines);
        }
      };
      screenSetup();
    }, [])
  );

  const renderListItem: ListRenderItem<Routine> = (props) => {
    return (
      <Button
        onPress={() =>
          navigation.navigate("Routine", {
            routine: props.item,
          })
        }
        title={props.item.name}
      />
    );
  };
  return (
    <View style={global.container}>
      <Text style={global.title}>Molly Tränar</Text>
      <Button
        onPress={() => TimerContext.startTimer(120)}
        title="Add workout"
      />
      <FlatList data={routines} renderItem={renderListItem} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
