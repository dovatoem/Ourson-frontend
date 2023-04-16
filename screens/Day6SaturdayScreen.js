import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import Header from "../components/Header";
export default function Day6SaturdayScreen({ navigation }) {
  return (
    <>
      <Header navigation={navigation} />
      <Text style={styles.title}>Samedi</Text>
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
