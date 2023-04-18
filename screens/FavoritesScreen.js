import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme, Button, Chip, Text } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  addWeeklyRecipes,
  resetCreatedAt,
  addLikedRecipe,
  removeLikedRecipe,
} from "../reducers/household";

import Header from "../components/Header";
import FavoriteRecipe from "../components/FavoriteRecipe";

export default function FavoritesScreen({ navigation }) {
  const likedRecipes = useSelector(
    (state) => state.household.value.likedRecipes
  );

  const adultRecipes = likedRecipes.adult.map((data, i) => {
    return data;
  });

  const babyRecipes = likedRecipes.baby.map((data, i) => (
    <FavoriteRecipe
      key={i}
      title={data.title}
      imageURL={data.imageURL}
      isLikedInDB={true}
      babyRecipe={data}
      adultRecipe={adultRecipes[i]}
    />
  ));

  console.log("favorisList", babyRecipes);

  return (
    <>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          <Text style={styles.descriptionPage}>
            Retrouvez ici toutes vos recettes enfants favorites !
          </Text>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.recipesContain}>{babyRecipes}</View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  recipesContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  recipeContain: {
    display: "flex",
    flexDirection: "column",
  },
  recipeCard: {
    width: 140,
    height: 140,
    borderRadius: 8,
    resizeMode: "cover",
    overflow: "hidden",
    marginBottom: 14,
  },
  recipeTitle: {
    fontFamily: "Bryndan_Write",
    fontSize: 20,
    lineHeight: 22,
    color: "white",
  },
  descriptionPage: {
    fontFamily: "Roboto",
    fontSize: 15,
    marginBottom: 20,
  },
});
