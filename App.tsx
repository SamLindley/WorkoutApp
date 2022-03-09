import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./src/navigation/HomeStack";
import Settings from "./src/screens/Settings";
import withTimerContext from "./src/state/hoc/withTimerContext";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="App" component={HomeStack} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default withTimerContext(App);
