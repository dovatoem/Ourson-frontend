import {
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
// import { Button } from "react-native-paper";

export default function OnBoardingScreen3({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <ImageBackground
        source={require("../assets/onBoardingBackground.png")}
        style={styles.background}
      >
        <Text style={styles.title}>Dernière étape</Text>
        <Text style={styles.text}>
          Voulez vous partager votre compte avec d'autres personnes de votre
          foyer?
        </Text>

        <Text style={styles.text}>Partage de compte</Text>
        <TextInput placeholder="Prénom" style={styles.input} />
        <TextInput
          placeholder="Email"
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
          style={styles.input}
        />
        <TextInput placeholder="Mot de passe" style={styles.input} />
        <Button
          title="Terminer  --> Go to TastedFood (test) "
          onPress={() => navigation.navigate("DayScreen")}
        />
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
