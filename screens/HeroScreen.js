import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper"; //composant particulier de react native paper
import ConfettiCannon from "react-native-confetti-cannon";

export default function HeroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ConfettiCannon count={500} origin={{ x: -100, y: 0 }} fallSpeed={5000} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.view}>
          <Image
            style={styles.image}
            source={require("../assets/oursonBear.png")}
          />
          <Text style={styles.text}>Ourson</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.circle}></View>
            <Button
              style={styles.button}
              contentStyle={{ width: 180, height: 60 }}
              mode="contained"
              onPress={() => navigation.navigate("SignIn")}
              title="Se connecter"
            >
              Se connecter
            </Button>
            <Button
              style={styles.button}
              contentStyle={{ width: 180, height: 60 }}
              mode="outlined"
              onPress={() => navigation.navigate("SignUp")}
              title="S'inscrire"
            >
              S'inscrire
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC219",
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 280,
    height: 310,
    marginTop: -180,
    marginBottom: 10,
  },
  text: {
    fontFamily: "Bryndan_Write",
    fontSize: 57,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 100,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    position: "absolute",
    bottom: 30,
  },

  button: {
    borderRadius: 60,
    marginTop: 20,
    justifyContent: "center",
  },

  circle: {
    width: 700,
    height: 700,
    borderRadius: 350,
    top: -80,
    backgroundColor: "white",
    position: "absolute",
    marginTop: 35,
  },
});
