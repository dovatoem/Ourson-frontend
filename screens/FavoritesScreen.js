import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

export default function FavoritesScreen({ navigation }) {
  const likedRecipes = useSelector(
    (state) => state.household.value.likedRecipes
  );

  const [savedLikedRecipes, setsavedLikedRecipes] = useState(likedRecipes);

  const babyRecipes = likedRecipes.baby.map((data, i) => {
    return (
      <View key={i} style={styles.recipeContain}>
        <View style={styles.recipeCard}>
          <ImageBackground
            style={{
              height: 140,
              width: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 8,
              paddingRight: 30,
            }}
            source={{
              uri: data.imageURL,
            }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={{
                height: 140,
                width: 140,
                position: "absolute",
                bottom: 0,
                opacity: 0.7,
              }}
            />
            <Text style={styles.recipeTitle}>{data.title}</Text>
          </ImageBackground>
        </View>
      </View>
    );
  });

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
