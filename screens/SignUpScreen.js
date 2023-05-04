import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
} from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Grabbed from emailregex.com
  const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Save in DB the user
  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
    fetch("https://back.ourson.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, email, firstName, password }));
          navigation.navigate("OnBoardingScreen1");
        } else {
          setShowError(!showError);
        }
      });
    } else {
      setEmailError(true);
    }
  };

  return (
    <View style={styles.fullcontainer}>
      <ImageBackground
        source={require("../assets/signBackground.png")}
        style={styles.background}
      >
        <Icon
          name="chevron-left"
          size={36}
          color="black"
          onPress={() => navigation.navigate("Hero")}
          style={styles.chevron}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.title}>Inscrivez-vous!</Text>
          <View style={styles.inputContainer}>
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
            <HelperText
              type="error"
              visible={emailError}
              style={styles.errorMessage}
            >
              Veuillez entrer une adresse email valide.             
            </HelperText>
            <HelperText
              type="error"
              visible={showError}
              style={styles.errorMessage}
            >
              L'utilisateur avec cet email existe déjà. Veuillez vous connecter
              ou utiliser un autre email pour créer un nouveau compte.             
            </HelperText>            
          </View>
          <Button
            style={styles.button}
            contentStyle={{ width: 180, height: 60 }}
            mode="contained"
            onPress={() => handleSubmit()}
          >
            S'inscrire
          </Button>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fullcontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  chevron: {
    padding: "10%",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 40,
    fontWeight: 700,
    textAlign: "center",
    marginTop: "7%",
  },
  inputContainer: {
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    marginBottom: "15%",
    marginTop: "15%",
  },
  input: {
    margin: 5,
    width: "85%",
    backgroundColor: "white",
  },
  errorMessage: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    color: "red",
  },
  button: {
    borderRadius: 60,
    justifyContent: "center",
  },
});
