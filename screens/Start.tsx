import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParmList } from "../navigation/RootStack";

type Theme = {
  Id: number;
  Color: string;
};

type Props = NativeStackScreenProps<RootStackParmList, "Start">;

const Start = ({ navigation }: Props) => {
  const colors: Array<Theme> = [
    {
      Id: 1,
      Color: "black",
    },
    {
      Id: 2,
      Color: "purple",
    },
    {
      Id: 3,
      Color: "blue",
    },
    {
      Id: 4,
      Color: "green",
    },
  ];

  const [selectedColor, setSelectedColor] = useState<Theme>(colors[0]);
  const [username, SetUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const selectColor = (id: number) => {
    const color = colors.find((color) => color.Id == id);

    if (color) {
      setSelectedColor(color);
    }
  };

  const navigateToChat = () => {
    if (username.length <= 0) {
      return setErrorMessage("Please enter a username!");
    }
    setErrorMessage("");
    navigation.push("Chat", {
      backgroundColor: selectedColor.Color,
      username: username,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.background}>
        <Text style={styles.appName}>Tomy App</Text>

        <View style={styles.cardContainer}>
          <TextInput style={styles.textInput} placeholder="Your name" onChangeText={(input: string) => SetUsername(input)} />
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : <></>}
          <View style={styles.colorSelector}>
            <Text style={styles.chooseText}>Choose Background Color:</Text>
            <View style={styles.circleContainer}>
              {colors.map((color) => {
                const isSelected = selectedColor.Id == color.Id;

                return (
                  <TouchableOpacity key={color.Id} onPress={() => selectColor(color.Id)}>
                    <View style={{ ...(isSelected ? styles.selectedCircle : styles.circle), backgroundColor: color.Color }}></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity onPress={() => navigateToChat()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start Chatting</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  appName: {
    marginBottom: 250,
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
  },

  errorMessage: {
    fontSize: 16,
    alignSelf: "center",
    color: "red",
  },

  cardContainer: {
    width: "88%",
    height: "44%",
    backgroundColor: "#fff",
    marginBottom: 30,
  },

  textInput: {
    marginTop: 15,
    color: "gray",
    fontSize: 20,
    padding: 15,
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
  },

  circleContainer: {
    minWidth: "100%",
    height: 70,
    alignItems: "center",
    flexDirection: "row",
  },

  circle: {
    margin: 10,
    minWidth: 40,
    height: 40,
    borderRadius: 20,
  },

  selectedCircle: {
    margin: 10,
    minWidth: 50,
    height: 50,
    borderRadius: 25,
  },

  chooseText: {
    fontSize: 20,
    marginLeft: 10,
  },

  colorSelector: {
    marginTop: 45,
    flex: 1,
  },

  button: {
    backgroundColor: "#757083",
    padding: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },

  buttonText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default Start;
