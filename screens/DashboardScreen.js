import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";

import DayScreen from "../screens/DayScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import PanicModeScreen from "../screens/PanicModeScreen";
import SearchScreen from "../screens/SearchScreen";
import TastedFoodScreen from "../screens/TastedFoodScreen";

import { setLastTabUsedIndex } from "../reducers/user";

import { IconButton } from "react-native-paper";

export default function DashboardScreen({ navigation }) {
  return <View style={{ backgroundColor: "red", flex: 1 }}></View>;
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
    marginTop: 100,
    marginBottom: 100,
  },
  text: {
    fontFamily: "Roboto_Regular",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
});
