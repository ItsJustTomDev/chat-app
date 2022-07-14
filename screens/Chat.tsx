import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { addDoc, collection, onSnapshot, DocumentData, QuerySnapshot, orderBy, query } from "firebase/firestore";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";

import { Button, StyleSheet, View } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { auth, db } from "../firebase/firebase-config";
import { RootStackParmList } from "../navigation/RootStack";

import { IMessage } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import CustomActions from "../components/CustomActions";
import MapView from "react-native-maps";

type Props = NativeStackScreenProps<RootStackParmList, "Chat">;

const Chat = ({ navigation, route }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [hasInternet, setHasInternet] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const { backgroundColor, username } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });

    NetInfo.fetch().then((connection) => {
      if (!connection.isConnected) {
        setHasInternet(false);
        getMessages();
      }
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
    const messages2: any = [];
    querySnapshot.forEach((doc: DocumentData) => {
      let data = doc.data();
      messages2.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    setMessages(messages2);
  };

  const addMessage = async (message: IMessage[]) => {
    const messagesCollectionRef = collection(db, "Messages");

    await addDoc(messagesCollectionRef, message[0]);

    saveMessages();
  };

  const getMessages = async () => {
    let messages: any = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      setMessages(JSON.parse(messages));
    } catch (error) {
      console.log(error);
    }
  };

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch (error) {
      console.log(error);
    }
  };

  const renderInputToolbar = (props: any) => {
    if (!hasInternet) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  const renderCustomActions = (props: any) => {
    return <CustomActions {...props} />;
  };

  function renderCustomView(props: any) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <GiftedChat
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        messages={messages}
        onSend={(message: IMessage[]) => addMessage(message)}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
