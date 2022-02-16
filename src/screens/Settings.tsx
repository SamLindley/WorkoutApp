import React from "react";
import { View, Text, TextInput } from "react-native";
import global from "../styles";

const Settings = () => {
  return (
    <View style={global.container}>
      <Text>Settings!</Text>
      <TextInput />
    </View>
  );
};

export default Settings;
