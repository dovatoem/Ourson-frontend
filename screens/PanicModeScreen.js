import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import { useState } from "react";
import Header from "../components/Header";

export default function PanicModeScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <>
      <Header navigation={navigation} currentScreen="PanicModeScreen" />
      <Text style={styles.title}>Panic Mode</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  title: {
    fontFamily: "Bryndan_Write",
    fontSize: 57,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
  },
});
