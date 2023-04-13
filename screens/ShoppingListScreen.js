import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import { Button, Chip } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";

export default function ShoppingListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <ImageBackground
        source={require("../assets/headerOursonBackground.png")}
        style={styles.background}
      >
        <Text style={styles.title}>ShoppingListScreen</Text>
      </ImageBackground>
    </View>
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
    marginTop: 100,
    marginBottom: 100,
  },
  text: {
    fontFamily: "Roboto_Regular",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
});
