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

export default function TastedFoodScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>$prénom a déjà goûté...</Text>
      <Text style={styles.text}>Légumes</Text>
      <Text style={styles.text}>2/30 légumes goûtés</Text>
      <Chip style={styles.chip}>Peppers</Chip>
      <Text style={styles.text}>Fruits</Text>
      <Text style={styles.text}>1/30 fruits goûtés</Text>
      <Chip style={styles.chip}>Chile Peppers</Chip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  chip: {
    marginBottom: 6,
    marginRight: 6,
  },
  title: {
    fontFamily: "Bryndan_Write",
    fontSize: 33,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
  },
  text: {
    fontFamily: "Roboto_Regular",
  },
});
