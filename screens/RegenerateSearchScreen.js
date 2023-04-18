import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { Chip, useTheme, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationState } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import Header from "../components/Header";

export default function RegenerateSearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header navigation={navigation} />
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADD8E6",
  },
  title: {
    fontFamily: "Bryndan_Write",
    fontSize: 57,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 100,
  },
});
