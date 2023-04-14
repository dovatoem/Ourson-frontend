import Header from "../components/Header";

import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Chip,
  useTheme,
  Button,
  Dialog,
  Portal,
  Text,
  Divider,
  RadioButton,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWeeklyRecipe } from "../reducers/household";

export default function MondayScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState("first");

  let babyRecipes = {};
  let adultRecipes = {};
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("usertoken", user.token);
    fetch("https://back.ourson.app/recipes/weekly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          data.recipes.map((data, i) => {
            dispatch(addWeeklyRecipe({ baby: data.baby, adult: data.adult }));
          });
        }
      });

    console.log("I Only run once (When the component gets mounted)");
  }, []);

  // APPEL REDUCER POUR GET LES 4 RECETTES BABY/ADULT MIDI/SOIR

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header navigation={navigation} currentScreen="MondayScreen" />
      <View style={styles.container}></View>
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
  },
});
