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
import { useTheme, Button, Chip, Text, Snackbar } from "react-native-paper";
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
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const [tempCanceledRecipe, setTempCanceledRecipe] = useState("");
  const tempCancellation = (recipe) => setTempCanceledRecipe(recipe);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // console.log("page", user);
  // console.log("after page", {
  //   baby: tempCanceledRecipe.baby._id,
  //   adult: tempCanceledRecipe.adult._id,
  // });

  const likedRecipes = useSelector(
    (state) => state.household.value.likedRecipes
  );

  const adultRecipes = likedRecipes.adult.map((data, i) => {
    return data;
  });

  const babyRecipes = likedRecipes.baby.map((data, i) => (
    <FavoriteRecipe
      key={data._id}
      title={data.title}
      imageURL={data.imageURL}
      isLikedInDB={true}
      babyRecipe={data}
      adultRecipe={adultRecipes[i]}
      onToggleSnackBar={() => onToggleSnackBar()}
      tempCancellation={(recipe) => tempCancellation(recipe)}
    />
  ));

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
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "ANNULER",
            onPress: () => {
              fetch("https://back.ourson.app/recipes/addLikedRecipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                  token: user.token,
                  recipeID: {
                    baby: tempCanceledRecipe.baby._id,
                    adult: tempCanceledRecipe.adult._id,
                  },
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  if (data.result) {
                    dispatch(addLikedRecipe(tempCanceledRecipe));
                  }
                });
            },
          }}
        >
          Recette favorite supprimée
        </Snackbar>
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
