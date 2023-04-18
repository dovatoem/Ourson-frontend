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

export default function FavoriteRecipe({
  navigation,
  imageURL,
  title,
  i,
  isLikedInDB,
  adultRecipe,
  babyRecipe,
  removeRecipeFromList,
}) {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(isLikedInDB);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleClickLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    if (newIsLiked) {
      fetch("https://back.ourson.app/recipes/addLikedRecipe", {
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
            dispatch(addLikedRecipe({ baby: babyRecipe, adult: adultRecipe }));
          } else {
            setIsLiked(!newIsLiked);
          }
        })
        .catch(() => {
          setIsLiked(!newIsLiked);
        });
    } else {
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
          } else {
            setIsLiked(!newIsLiked);
          }
        })
        .catch(() => {
          setIsLiked(!newIsLiked);
        });
    }
  };

  let heartIcon = "";
  if (isLiked) {
    heartIcon = (
      <TouchableOpacity
        style={styles.heartIconBackground}
        onPress={() => {
          handleClickLike();
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
            <Text style={styles.recipeTitle}>{title}</Text>
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
