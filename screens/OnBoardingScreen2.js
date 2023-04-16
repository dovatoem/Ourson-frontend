import {
  StyleSheet,
  ImageBackground,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Text, ProgressBar, RadioButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { saveDiet, updateUserDiet } from "../reducers/user";

export default function OnBoardingScreen1({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const household = useSelector((state) => state.household.value);

  const [checked, setChecked] = useState("null");
  const [diet, setDiet] = useState("");

  const handleSubmit = () => {
    console.log('household', household);  
    fetch('https://back.ourson.app/users/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token: user.token, 
        dietName: diet, 
        hhSize: household.hhSize, 
        kidsCount: household.kidsCount,
        kidsArray: household.kidsArray
       }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
        console.log('hh reducer', household);  
        console.log('data post fetch profile', data); 
        navigation.navigate("OnBoardingScreen3")}       
      });      
  }

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
          onPress={() => navigation.navigate("OnBoardingScreen1")}
          style={styles.chevron}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bienvenue {user.firstName}!</Text>
            <Text style={styles.headerText}>
              Pour vous offrir une expérience unique, nous avons besoin de
              quelques précisions
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Régimes parentaux</Text>
            <RadioButton.Group
              onValueChange={(value) => {
                setChecked(value), setDiet(value);
              }}
              value={checked}
            >
              <RadioButton.Item
                label="Végétarien"
                value="Végétarien"
                labelStyle={{
                  fontSize: 16,
                  lineHeight: 22,
                }}
              />
              <RadioButton.Item
                label="Pescétarien"
                value="Pescétarien"
                labelStyle={{
                  fontSize: 16,
                  lineHeight: 22,
                }}
              />
              <RadioButton.Item
                label="Végétalien"
                value="Végétalien"
                labelStyle={{
                  fontSize: 16,
                  lineHeight: 22,
                }}
              />
              <RadioButton.Item
                label="Aucun de ceux-ci"
                value="null"
                labelStyle={{
                  fontSize: 16,
                  lineHeight: 22,
                }}
              />
            </RadioButton.Group>
          </View>
          <Button
            style={styles.button}
            contentStyle={{ width: 180, height: 60 }}
            mode="outlined"
            onPress={() => handleSubmit()}
          >
            Continuer
          </Button>
          <ProgressBar progress={0.5} style={styles.progressBar} />
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
    marginBottom: 35,
  },
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
