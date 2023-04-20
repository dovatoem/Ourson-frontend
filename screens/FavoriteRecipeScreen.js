import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { Chip, useTheme, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationState } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import Header from "../components/Header";

export default function FavoriteRecipeScreen({ navigation }) {
  const route = useRoute();
  const babyRecipe = route.params.babyRecipe;
  const adultRecipe = route.params.adultRecipe;
  const hhSize = useSelector((state) => state.household.value.hhSize);
  const kidsCount = useSelector((state) => state.household.value.kidsCount);
  const [babyCounter, setBabyCounter] = useState(kidsCount);
  const [adultCounter, setAdultCounter] = useState(hhSize - kidsCount);

  //refaire parce que les conditions sont mauvaises
  const babyIngredientsChips = babyRecipe?.ingredients.map((data, i) => {
    let ingredientMapped = "";
    if (data.quantity === null || data.quantity === 0) {
      ingredientMapped = data.name;
    } else if (
      !(data.quantity === null || data.quantity === 0) &&
      (data.unit === null || data.unit === 0)
    ) {
      ingredientMapped = `${
        (Math.round((data.quantity / babyRecipe.portion) * 100) / 100) *
        babyCounter
      } ${data.name}`;
    } else {
      ingredientMapped = `${
        (Math.round((data.quantity / babyRecipe.portion) * 100) / 100) *
        babyCounter
      } ${data.unit} de ${data.name}`;
    }
    return (
      <Chip key={i} style={styles.chip}>
        <Text style={styles.chipText}>{ingredientMapped}</Text>
      </Chip>
    );
  });

  //refaire parce que les conditions sont mauvaises
  const adultIngredientsChips = adultRecipe?.ingredients.map((data, i) => {
    if (data.quantity === null || data.quantity === 0) {
      ingredientMapped = data.name;
    } else if (data.unit === null && data.quantity !== null) {
      ingredientMapped = `${
        (Math.round((data.quantity / adultRecipe.portion) * 100) / 100) *
        adultCounter
      } ${data.name}`;
    } else {
      ingredientMapped = `${
        (Math.round((data.quantity / adultRecipe.portion) * 100) / 100) *
        adultCounter
      } ${data.unit} de ${data.name}`;
    }
    return (
      <Chip key={i} style={styles.chip}>
        <Text style={styles.chipText}>{ingredientMapped}</Text>
      </Chip>
    );
  });

  // code to handle conditional portions
  const handleClickPortionsBaby = (data) => {
    if (data === "sub") {
      if (babyCounter > 1) setBabyCounter(+babyCounter - 1);
    } else {
      setBabyCounter(+babyCounter + 1);
    }
  };

  const handleClickPortionsAdult = (data) => {
    if (data === "sub") {
      if (adultCounter > 1) {
        setAdultCounter(+adultCounter - 1);
      }
    } else {
      setAdultCounter(+adultCounter + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.titleContain}>
          <View style={styles.titleSwiper}>
            <Text style={styles.titleInactive}>Recette favorite</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.recipesContain}>
            <View style={styles.recipeContain}>
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
                    uri: babyRecipe?.imageURL,
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
                  <Text style={styles.recipeTitle}>{babyRecipe?.title}</Text>
                </ImageBackground>
              </View>
              <View style={styles.recipePortion}>
                <Text style={styles.titlePortion}>Portions</Text>
                <View style={styles.changePortion}>
                  <Icon
                    name="minus"
                    size={28}
                    color="black"
                    onPress={() => {
                      handleClickPortionsBaby("sub");
                    }}
                  />
                  <Text style={styles.nbPortion}>{babyCounter}</Text>
                  <Icon
                    name="plus"
                    size={28}
                    color="black"
                    onPress={() => {
                      handleClickPortionsBaby("add");
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.recipeContain}>
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
                    uri: adultRecipe?.imageURL,
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
                  <Text style={styles.recipeTitle}>{adultRecipe?.title}</Text>
                </ImageBackground>
              </View>
              <View style={styles.recipePortion}>
                <Text style={styles.titlePortion}>Portions</Text>
                <View style={styles.changePortion}>
                  <Icon
                    name="minus"
                    size={28}
                    color="black"
                    onPress={() => {
                      handleClickPortionsAdult("sub");
                    }}
                  />
                  <Text style={styles.nbPortion}>{adultCounter}</Text>
                  <Icon
                    name="plus"
                    size={28}
                    color="black"
                    onPress={() => {
                      handleClickPortionsAdult("add");
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.mainRecipe}>
            <Text style={styles.titleMainRecipe}>{babyRecipe?.title}</Text>
            <Text style={styles.ingredientsMainRecipe}>Ingrédients :</Text>
            <View style={styles.ingredientsChipsContainer}>
              {babyIngredientsChips}
            </View>
            <Text style={styles.instructionsMainRecipe}>Instructions :</Text>
            <Text style={styles.instructions}>{babyRecipe?.instructions}</Text>
          </View>
          <View style={styles.mainRecipe}>
            <Text style={styles.titleMainRecipe}>{adultRecipe?.title}</Text>
            <Text style={styles.ingredientsMainRecipe}>Ingrédients :</Text>
            <View style={styles.ingredientsChipsContainer}>
              {adultIngredientsChips}
            </View>
            <Text style={styles.instructionsMainRecipe}>Instructions :</Text>
            <Text style={styles.instructions}>{adultRecipe?.instructions}</Text>
          </View>
        </ScrollView>
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
  titleContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  titleSwiper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleActive: {
    fontFamily: "Roboto-Bold",

    fontSize: 24,
    lineHeight: 32,
    color: "rgb(255, 107, 87)",
  },
  viewActive: {
    borderBottomColor: "rgb(255, 107, 87)",
    borderBottomWidth: 2,
  },
  viewInactive: {
    borderBottomWidth: 0,
  },

  titleSeparator: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    lineHeight: 32,
    marginLeft: 4,
    marginRight: 4,
  },
  titleInactive: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: "black",
  },
  iconContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
  recipesContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  recipeTitle: {
    fontFamily: "Bryndan_Write",
    fontSize: 24,
    lineHeight: 26,
    color: "white",
  },
  recipePortion: {
    width: 140,
    height: 65,
    marginTop: 6,
    marginBottom: 10,
  },
  titlePortion: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
  changePortion: {
    fontFamily: "Roboto-Bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 4,
  },
  nbPortion: { fontSize: 20, lineHeight: 20 },
  mainRecipe: {
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FFDAD4",
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
  },
  titleMainRecipe: {
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 10,
  },
  ingredientsMainRecipe: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
  ingredientsChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
  },
  chipText: {
    flex: 1,
  },
  chip: {
    marginBottom: 6,
    marginRight: 6,
    height: 40,
  },
  instructionsMainRecipe: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
});
