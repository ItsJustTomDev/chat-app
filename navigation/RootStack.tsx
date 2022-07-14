import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "../screens/Start";
import Chat from "../screens/Chat";

export type RootStackParmList = {
  Start: undefined;
  Chat: { backgroundColor: string; username: string };
};

const Stack = createNativeStackNavigator<RootStackParmList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "gray",
          },
          headerTintColor: "white",
          headerTransparent: true,
        }}
        initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
