import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { addDoc, collection, onSnapshot, DocumentData, QuerySnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../firebase/firebase-config";
import { RootStackParmList } from "../navigation/RootStack";

import { IMessage } from "./types";

type Props = NativeStackScreenProps<RootStackParmList, "Chat">;

const Chat = ({ navigation, route }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [user, setUser] = useState<User>();
  const { backgroundColor, username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth);
      } else {
        setUser(user);
      }
    });

    return authUnsubscribe;
  }, []);

  useEffect(() => {
    const messagesCollectionRef = collection(db, "Messages");
    const q = query(messagesCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, onCollectionUpdate);

    return unsubscribe;
  }, []);

  const onCollectionUpdate = (querySnapshot: QuerySnapshot) => {
    const messages2: IMessage[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
      let data = doc.data();
      messages2.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    setMessages(messages2);
  };

  const addMessage = async (message: IMessage[]) => {
    const messagesCollectionRef = collection(db, "Messages");

    await addDoc(messagesCollectionRef, {
      text: message[0].text,
      _id: message[0]._id,
      createdAt: message[0].createdAt,
      user: {
        _id: user?.uid,
        name: username,
      },
    });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <GiftedChat messages={messages} onSend={(message: IMessage[]) => addMessage(message)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
