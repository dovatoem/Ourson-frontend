import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { Chip,
  useTheme,
  Button,
  Dialog,
  Portal,
  Text,
  Divider,
  RadioButton, } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchedRecipe } from "../reducers/recipes";


export default function SearchedRecipeScreen({ navigation }) {
  const theme = useTheme();

 const babyRecipe = useSelector((state) => state.recipes.value);

  const [babyCounter, setBabyCounter] = useState(babyRecipe.portions);

  const babyIngredientsChips = babyRecipe.ingredients.map((data, i) => {
    let ingredientMapped = "";
    if (data.quantity === null) {
      ingredientMapped = data.name;
    } else if (data.unit === null && data.quantity !== null) {
      ingredientMapped = `${
        (data.quantity / babyRecipe.portions) * babyCounter
      } ${data.name}`;
    } else {
      ingredientMapped = `${
        (data.quantity / babyRecipe.portions) * babyCounter
      } ${data.unit} de ${data.name}`;
    }
    return (
      <Chip key={i} style={styles.chip}>
        <Text style={styles.chipText}>{ingredientMapped}</Text>
      </Chip>
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollView}>
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
                    uri: babyRecipe.imageURL,
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
            <Text style={styles.titleMainRecipe}>{babyRecipe.title}</Text>
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
