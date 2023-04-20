import { StyleSheet, ScrollView, View, ImageBackground } from "react-native";
import { Chip, useTheme, Text } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchedRecipe } from "../reducers/recipes";

export default function SingleRecipeScreen({ navigation }) {
  const theme = useTheme();

  // Reducers ref
  const kidsCount = useSelector((state) => state.household.value.kidsCount);

  const babyRecipe = useSelector((state) => state.recipes.value.searchedRecipe);
  console.log(
    "recette du reducer accédée via SearchedRecipeScreen",
    babyRecipe
  );

  const [babyCounter, setBabyCounter] = useState(kidsCount);

  const babyIngredientsChips = babyRecipe?.ingredients.map((data, i) => {
    let ingredientMapped = "";
    if (
      typeof data.quantity === "undefined" ||
      data.quantity === null ||
      data.quantity === 0 ||
      data.quantity === "null" ||
      isNaN(data.quantity)
    ) {
      ingredientMapped = data.name;
    } else if (
      !(
        typeof data.quantity === "undefined" ||
        data.quantity === null ||
        data.quantity === 0 ||
        data.quantity === "null" ||
        isNaN(data.quantity)
      ) &&
      (typeof data.unit === "undefined" ||
        data.unit === null ||
        data.unit === 0 ||
        data.unit === "null" ||
        isNaN(data.unit))
    ) {
      ingredientMapped = `${
        (Math.round((data.quantity / babyRecipe.portion) * 10) / 10) *
        babyCounter
      } ${data.name}`;
    } else {
      ingredientMapped = `${
        (Math.round((data.quantity / babyRecipe.portion) * 10) / 10) *
        babyCounter
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
      if (babyCounter > 1) setBabyCounter(babyCounter - 1);
    } else {
      setBabyCounter(+babyCounter + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.recipesContain}>
            <View style={styles.recipeContain}>
              <View style={styles.recipeCard}>
                <ImageBackground
                  style={{
                    height: 290,
                    width: 290,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "8%",
                  }}
                  z
                  source={{
                    uri: babyRecipe.imageURL,
                  }}
                >
                  <LinearGradient
                    colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                    style={{
                      height: 290,
                      width: 290,
                      position: "absolute",
                      bottom: 0,
                      opacity: 0.5,
                    }}
                  />
                  <Text style={styles.recipeTitle}>{babyRecipe.title}</Text>
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
          </View>
          <View style={styles.mainRecipe}>
            <Text style={styles.ingredientsMainRecipe}>Ingrédients :</Text>
            <View style={styles.ingredientsChipsContainer}>
              {babyIngredientsChips}
            </View>
            <Text style={styles.instructionsMainRecipe}>Instructions :</Text>
            <Text style={styles.instructions}>{babyRecipe.instructions}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginBottom: 6,
    marginRight: 6,
  },
  chipText: {
    flex: 1,
  },
  container: {
    margin: 40,
    marginLeft: 40,
    marginRight: 40,
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
  instructionsMainRecipe: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
  },
  mainRecipe: {
    borderRadius: 8,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFDAD4",
    marginBottom: 14,
    marginRight: 10,
  },
  nbPortion: {
    fontSize: 20,
    lineHeight: 20,
  },
  title: {
    fontFamily: "Bryndan_Write",
    fontSize: 57,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
  },
  titlePortion: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
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
    width: 290,
    height: 290,
    borderRadius: 8,
    resizeMode: "cover",
    overflow: "hidden",
  },
  recipeTitle: {
    fontFamily: "Bryndan_Write",
    fontSize: 34,
    lineHeight: 40,
    color: "white",
  },
  recipePortion: {
    width: 140,
    height: 65,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 75,
  },
  changePortion: {
    fontFamily: "Roboto-Bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 4,
  },
});
