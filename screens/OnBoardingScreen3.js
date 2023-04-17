import {
  StyleSheet,
  ImageBackground,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Text, ProgressBar, TextInput } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function OnBoardingScreen1({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const household = useSelector((state) => state.household.value);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [todayDay, setTodayDay] = useState("");

  useEffect(() => {
    const dayOfWeek = new Date().getDay();
    switch (dayOfWeek) {
      case 0:
        setTodayDay("SundayScreen");
        break;
      case 1:
        setTodayDay("MondayScreen");
        break;
      case 2:
        setTodayDay("TuesdayScreen");
        break;
      case 3:
        setTodayDay("WednesdayScreen");
        break;
      case 4:
        setTodayDay("ThursdayScreen");
        break;
      case 5:
        setTodayDay("FridayScreen");
        break;
      case 6:
        setTodayDay("SaturdayScreen");
        break;
      default:
        break;
    }
  }, []);

  const handleSubmit = () => {
    // via
    if (firstName && email && password) {
      fetch("https://back.ourson.app/users/signupGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, password, token: user.token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("data guest user", data);
            navigation.navigate(todayDay);
          }
        });
    } else {
      navigation.navigate(todayDay);
    }
  };

  return (
    <View style={styles.fullContainer}>
      <SafeAreaView style={styles.safeArea} />
      <ImageBackground
        source={require("../assets/onBoardingBackground.png")}
        style={styles.background}
      >
        <Icon
          name="chevron-left"
          size={36}
          color="black"
          onPress={() => navigation.navigate("OnBoardingScreen2")}
          style={styles.chevron}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Dernière étape !</Text>
            <Text style={styles.headerText}>
              Voulez-vous partager votre compte avec d'autres personnes de votre
              foyer?{" "}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Partage de compte</Text>
            <TextInput
              onChangeText={(value) => setFirstName(value)}
              mode="outlined"
              label="Prénom"
              style={styles.input}
            />
            <TextInput
              onChangeText={(value) => setEmail(value)}
              mode="outlined"
              label="Email"
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              onChangeText={(value) => setPassword(value)}
              mode="outlined"
              label="Mot de passe"
              style={styles.input}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                  color="#808080"
                />
              }
            />
          </View>
          <Button
            style={styles.button}
            contentStyle={{ width: 180, height: 60 }}
            mode="contained"
            onPress={() => handleSubmit()}
          >
            Terminer
          </Button>
          <ProgressBar progress={0.75} style={styles.progressBar} />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  // safeArea: {
  //   flex: 1,
  //   marginBottom: 35,
  // },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  chevron: {
    marginLeft: "5%",
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    width: "85%",
    marginTop: "10%",
    backgroundColor: "#ffff",
    borderRadius: 10,
    alignItems: "center",
  },
  header: {
    marginLeft: "5%",
  },
  headerTitle: {
    fontFamily: "Roboto",
    fontSize: 36,
    fontWeight: 700,
    marginTop: "5%",
  },
  headerText: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    marginRight: "5%",
    marginTop: "3%",
  },
  inputContainer: {
    marginLeft: "5%",
    width: "85%",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 600,
    marginTop: 25,
  },
  input: {
    margin: 5,
    width: "85%",
    backgroundColor: "white",
  },
  button: {
    borderRadius: 60,
    justifyContent: "center",
    marginTop: 130,
    alignSelf: "center",
  },
  progressBar: {
    width: 290,
    marginTop: 35,
    alignSelf: "center",
  },
});
