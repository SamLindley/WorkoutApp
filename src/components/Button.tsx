import React from "react";
import { Pressable, View, Text } from "react-native";
import global from "../styles";

interface Props {
  onPress: () => void;
  title: string;
}

export default ({ onPress, title }: Props) => (
  <Pressable onPress={onPress}>
    <View style={global.button}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </View>
  </Pressable>
);
