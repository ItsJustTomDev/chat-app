import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import { RootStackParmList } from "../navigation/RootStack";

type Props = NativeStackScreenProps<RootStackParmList, "Chat">;

const Chat = ({ navigation, route }: Props) => {
  const { backgroundColor, username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  return <View style={{ ...styles.container, backgroundColor: backgroundColor }}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
