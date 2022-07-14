import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { GiftedChat, User } from "react-native-gifted-chat";
import { RootStackParmList } from "../navigation/RootStack";

type Props = NativeStackScreenProps<RootStackParmList, "Chat">;

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

const Chat = ({ navigation, route }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { backgroundColor, username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });

    setMessages([
      {
        _id: 3,
        text: "Hello world!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: username,
        },
      },
      {
        _id: 2,
        text: "Its a beautiful day today!",
        createdAt: new Date(),
        user: {
          _id: 3,
          name: username,
        },
      },
      {
        _id: 1,
        text: `Welcome to the chat ${username}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: username,
        },
        system: true,
      },
    ]);
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <GiftedChat messages={messages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
