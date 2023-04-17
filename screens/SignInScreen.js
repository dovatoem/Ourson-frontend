import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
} from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { getHousehold } from "../reducers/household";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./ProfileScreen";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [todayDay, setTodayDay] = useState("");
  const [showError, setShowError] = useState(false);

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

  // Check if user is registered
  const handleSubmit = () => {
    fetch("https://ourson-app-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {      
        if (data.result) {
          dispatch(
            login({ token: data.user.token, email: data.user.email, firstName: data.user.firstName})
          );
          dispatch(
            getHousehold({ 
              hhSize: data.household.hhSize, 
              kidsCount: data.household.kidsCount, 
              kidsArray: data.household.kids[0], 
              savedWeeklyRecipes: 
              {                
                baby: data.household.weeklyRecipes.map((recipe) => recipe.baby),
                adult: data.household.weeklyRecipes.map((recipe) => recipe.adult),
              },
              likedRecipes: {                
                baby: data.household.likedRecipes.map((recipe) => recipe.baby),
                adult: data.household.likedRecipes.map((recipe) => recipe.adult),
              },
              createdAt: data.household.createdAt,
             })
          );
          navigation.navigate(todayDay);          
        } else {
          setShowError(!showError);
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
            <HelperText type="error" visible={showError} style={styles.errorMessage}>
              Email et/ou mot de passe incorrect(s)
            </HelperText>
          </View>
          <Button
            style={styles.button}
            contentStyle={{ width: 180, height: 60 }}
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
  errorMessage: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    color: 'red',
  },
  button: {
    borderRadius: 60,
    justifyContent: "center",
  },
});
