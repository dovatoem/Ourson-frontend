import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button, TextInput, Text, RadioButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.fullContainer}>
      <SafeAreaView style={styles.safeArea} />
      <ImageBackground
        source={require("../assets/parametersBackground.png")}
        style={styles.background}
      >
        <View style={styles.header}>
          <Icon
            name="chevron-left"
            size={36}
            color="black"
            onPress={() => navigation.goBack()}
            style={styles.chevron}
          />
          <Text style={styles.bigTitle}>Paramètres</Text>
          <View></View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.adminContain}>
              <Text style={styles.title}>Vos identifiants</Text>
              <TextInput
                disabled="true"
                mode="outlined"
                label="Email"
                style={styles.input}
                keyboardType="email-address"
              />
              <TextInput
                disabled="true"
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

            <Text style={styles.title}>Compte partagé avec</Text>

            <Text style={styles.title}>Vos enfants</Text>
          </ScrollView>
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
  safeArea: {
    flex: 1,
    marginBottom: 40,
    marginTop: 5,
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    marginTop: "10%",
    width: "80%",
  },
  bigTitle: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 700,
    paddingLeft: 20,
  },
  container: {
    width: "80%",
    backgroundColor: "red",
  },
  scrollView: {
    borderRadius: 10,
    backgroundColor: "green",
  },
  adminContain: {
    alignItems: "flex-start",
    borderColor: "red",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    marginTop: "7%",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
  },
});
