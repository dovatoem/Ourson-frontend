import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
} from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // local states saving the user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Check if user is registered
  const handleSubmit = () => {
    fetch("https://back.ourson.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.result) {
          dispatch(
            login({ token: data.token, email, firstName: data.firstName })
          );
          console.log("signinSreen", user);
          navigation.navigate("DashboardScreen");
        }
      });
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
          <Text style={styles.title}>Se connecter</Text>
          <View style={styles.inputContainer}>
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
            mode="contained"
            onPress={() => handleSubmit()}
          >
            Se connecter
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
    fontFamily: "Roboto",
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
  button: {
    width: 180,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
  },
});
