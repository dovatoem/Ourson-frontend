import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button, TextInput, Text, ProgressBar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { addHousehold } from "../reducers/household";

export default function OnBoardingScreen1({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const household = useSelector((state) => state.household.value);

  // local states saving the user inputs
  const [hhSize, setHhSize] = useState("");
  const [kidsCount, setKidsCount] = useState("");
  const [kidFields, setKidFields] = useState([]);
  const [kidNames, setKidNames] = useState([]);
  const [kidAges, setKidAges] = useState([]);

  const handleNumKidsChange = (value) => {
    setKidsCount(value);
    setKidNames(Array(value).fill(""));
    setKidAges(Array(value).fill(""));
  };

  useEffect(() => {
    generateKidInputs();
  }, [kidsCount]);

  const generateKidInputs = () => {
    let inputs = [];
    let prenom;
    let age;
    for (let i = 1; i <= kidsCount; i++) {
      if (i === 1) {
        prenom = "Prénom du 1er enfant";
        age = "Age du 1er enfant";
      } else {
        prenom = `Prénom du ${i}ème enfant`;
        age = `Age du ${i}ème enfant`;
      }
      inputs.push(
        <View key={i}>
          <TextInput
            onChangeText={(value) => handleKidNameChange(value, i)}
            mode="outlined"
            label={prenom}
            style={styles.input}
          />
          <TextInput
            onChangeText={(value) => handleKidAgeChange(value, i)}
            mode="outlined"
            label={age}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      );
    }
    setKidFields(inputs);
  };

  const handleKidNameChange = (value, index) => {
    const names = [...kidNames];
    console.log("names", names);
    console.log("index", index);
    console.log("index", index);
    names[index] = value;
    setKidNames(names);
    console.log("names", names);
  };

  const handleKidAgeChange = (value, index) => {
    const ages = [...kidAges];
    ages[index] = value;
    setKidAges(ages);
  };

  const handleSubmit = () => {
    console.log("kidNames", kidNames);
    console.log("kidAges", kidAges);
    dispatch(addHousehold({ hhSize, kidsCount }));
    navigation.navigate("OnBoardingScreen2");
    console.log("Onboarding1", user);
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
          onPress={() => navigation.navigate("SignUp")}
          style={styles.chevron}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bienvenue {user.firstName}!</Text>
          </View>
          <ScrollView contentContainerStyle={styles.inputContainer}>
            <Text style={styles.headerText}>
              Pour vous offrir une expérience unique, nous avons besoin de
              quelques précisions
            </Text>
            <Text style={styles.title}>Votre foyer</Text>
            <TextInput
              onChangeText={(value) => setHhSize(value)}
              mode="outlined"
              label="Nombre de personnes"
              keyboardType="numeric"
              style={styles.input}
            />
            <Text style={styles.title}>Vos enfants</Text>
            <TextInput
              onChangeText={(value) => handleNumKidsChange(value)}
              mode="outlined"
              label="Nombre d'enfants(s)"
              keyboardType="numeric"
              style={styles.input}
            />
            {kidFields}
            <Button
              style={styles.button}
              contentStyle={{ width: 180, height: 60 }}
              mode="outlined"
              onPress={() => handleSubmit()}
            >
              Continuer
            </Button>
            <ProgressBar progress={0.25} style={styles.progressBar} />
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
  input: {
    width: 290,
    backgroundColor: "white",
    marginTop: 25,
  },
  button: {
    borderRadius: 60,
    justifyContent: "center",
    marginTop: 35,
    alignSelf: "center",
  },
  progressBar: {
    width: 290,
    marginTop: 35,
    alignSelf: "center",
  },
});
