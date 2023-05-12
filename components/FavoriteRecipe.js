import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useTheme, Text } from "react-native-paper";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { addLikedRecipe, removeLikedRecipe } from "../reducers/household";

import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function FavoriteRecipe({
  imageURL,
  title,
  i,
  isLikedInDB,
  adultRecipe,
  babyRecipe,
  onToggleSnackBar,
  tempCancellation,
}) {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(isLikedInDB);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleClickLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    fetch("https://back.ourson.app/recipes/removeLikedRecipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        recipeID: { baby: babyRecipe._id, adult: adultRecipe._id },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            removeLikedRecipe({
              baby: babyRecipe._id,
              adult: adultRecipe._id,
            })
          );
          onToggleSnackBar();
        } else {
          setIsLiked(!newIsLiked);
          dispatch(addLikedRecipe({ baby: babyRecipe, adult: adultRecipe }));
        }
      })
      .catch(() => {
        setIsLiked(!newIsLiked);
      });
  };

  let heartIcon = "";
  if (isLiked) {
    heartIcon = (
      <TouchableOpacity
        style={styles.heartIconBackground}
        onPress={() => {
          handleClickLike();
          tempCancellation({
            baby: babyRecipe,
            adult: adultRecipe,
          });
        }}
      >
        <Icon name="heart" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
    );
  } else {
    heartIcon = (
      <TouchableOpacity
        style={styles.heartIconBackground}
        onPress={() => {
          handleClickLike();
        }}
      >
        <Icon name="heart-outline" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
    );
  }
  return (
    <View key={i} style={styles.recipesContain}>
      <View style={styles.recipeCard}>
        <ImageBackground
          style={{
            height: 140,
            width: 140,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 8,
          }}
          source={{
            uri: imageURL,
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
          <View style={styles.containerTextHeart}>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {heartIcon}
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FavoriteRecipeScreen", {
                  babyRecipe: babyRecipe,
                  adultRecipe: adultRecipe,
                })
              }
            >
              <Text style={styles.recipeTitle}>{title}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
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
  descriptionPage: {
    fontFamily: "Roboto",
    fontSize: 15,
    marginBottom: 20,
  },
  recipeCard: {
    width: 140,
    height: 140,
    borderRadius: 8,
    resizeMode: "cover",
    overflow: "hidden",
    marginBottom: 14,
  },

  containerTextHeart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
  },

  recipeTitle: {
    fontFamily: "Bryndan_Write",
    fontSize: 20,
    lineHeight: 22,
    color: "white",
    height: 70,
  },

  heartIconBackground: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
