import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Chip,
  useTheme,
  Button,
  Dialog,
  Portal,
  Text,
  Divider,
  RadioButton,
} from "react-native-paper";

import { useState, useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import {
  addWeeklyRecipes,
  resetCreatedAt,
  addLikedRecipe,
  removeLikedRecipe,
} from "../reducers/household";

import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Lottie from "lottie-react-native";

function Animation() {
  return (
    <Lottie
      style={{ marginBottom: 60 }}
      source={require("../assets/25523-wok-pan-food-fry-on-fire.json")}
      autoPlay
      loop
    />
  );
}

export default function DayScreen({ navigation }) {
  const currentScreen = useNavigationState(
    (state) => state.routes[state.index].name
  );

  const theme = useTheme();
  const dispatch = useDispatch();

  // Reducers ref
  const user = useSelector((state) => state.user.value);
  const household = useSelector((state) => state.household.value);
  const savedWeeklyRecipes = useSelector(
    (state) => state.household.value.savedWeeklyRecipes
  );
  const createdAtValue = useSelector(
    (state) => state.household.value.createdAt
  );
  const createdAt = createdAtValue ? new Date(createdAtValue) : new Date();
  const likedRecipes = useSelector(
    (state) => state.household.value.likedRecipes
  );
  const hhSize = useSelector((state) => state.household.value.hhSize);
  const kidsCount = useSelector((state) => state.household.value.kidsCount);

  //Local States
  const [activeMenu, setActiveMenu] = useState(
    new Date().getHours() >= 17 ? "soir" : "midi"
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState("first");
  const [weeklyRecipes, setWeeklyRecipes] = useState({ baby: [], adult: [] });

  // On first launch, check reducer. If contains Weeklyrecipes AND <7 days, recipes will come from reducer
  // if > 7 days OR reducer Weeklyrecipes is empty, just fetch it from database.
  useEffect(() => {
    console.log("usertoken", user.token);

    let timepast = Date.now() - createdAt;
    console.log("createdAt initial", createdAt);
    console.log("timepast initial", timepast);
    setWeeklyRecipes(savedWeeklyRecipes);
    if (
      !(
        savedWeeklyRecipes.baby.length === 0 &&
        savedWeeklyRecipes.adult.length === 0
      ) &&
      timepast > 604800000
    ) {
      console.log("Not");
    } else {
      console.log("1");
      fetch("https://back.ourson.app/recipes/weekly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("2");
          if (data.result) {
            console.log("3");
            setWeeklyRecipes({
              baby: data.recipes.map((recipe) => recipe.baby),
              adult: data.recipes.map((recipe) => recipe.adult),
            });
            console.log("4");
            dispatch(
              addWeeklyRecipes({
                baby: data.recipes.map((recipe) => recipe.baby),
                adult: data.recipes.map((recipe) => recipe.adult),
              })
            );
            console.log(data);
            dispatch(resetCreatedAt(Date.now()));
            console.log("createdAt", createdAt);
            console.log("Date.now", Date.now());
            console.log("5");
          }
        });
    }
  }, []);

  // Code to know where we are and give an index to each day of the week to display proper recipe
  let dayNumberNoon = 0;
  let dayNumberNight = 1;
  switch (currentScreen) {
    case "MondayScreen":
      dayNumberNoon = 0;
      dayNumberNight = 1;
      break;
    case "TuesdayScreen":
      dayNumberNoon = 2;
      dayNumberNight = 3;
      break;
    case "WednesdayScreen":
      dayNumberNoon = 4;
      dayNumberNight = 5;
      break;
    case "ThursdayScreen":
      dayNumberNoon = 6;
      dayNumberNight = 7;
      break;
    case "FridayScreen":
      dayNumberNoon = 8;
      dayNumberNight = 9;
      break;
    case "SaturdayScreen":
      dayNumberNoon = 10;
      dayNumberNight = 11;
      break;
    case "SundayScreen":
      dayNumberNoon = 12;
      dayNumberNight = 13;
      break;
    default:
      // do nothing
      break;
  }

  // Set each variable with its index depending of day or night meal
  let babyRecipe = "";
  let adultRecipe = "";
  let babyRecipeNoon = weeklyRecipes.baby[dayNumberNoon];
  let adultRecipeNoon = weeklyRecipes.adult[dayNumberNoon];
  let babyRecipeNight = weeklyRecipes.baby[dayNumberNight];
  let adultRecipeNight = weeklyRecipes.adult[dayNumberNight];

  if (activeMenu === "midi") {
    babyRecipe = babyRecipeNoon;
    adultRecipe = adultRecipeNoon;
  } else {
    babyRecipe = babyRecipeNight;
    adultRecipe = adultRecipeNight;
  }

  // reducer household pour nombre de portions à faire
  const [babyCounter, setBabyCounter] = useState(kidsCount);
  const [adultCounter, setAdultCounter] = useState(hhSize - kidsCount);

  //Conditions baby pour gérer les trous de la base sur unit/quantity
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
        data.unit === "null")
    ) {
      ingredientMapped = `${
        (Math.round((data.quantity / babyRecipe.portion) * 10) / 10) *
        babyCounter
      } ${data.name}`;

      let quantity = (data.quantity / babyRecipe.portion) * babyCounter;
      if (Number.isInteger(quantity)) {
        ingredientMapped = `${quantity.toFixed(0)} de ${data.name}`;
      } else {
        ingredientMapped = `${quantity.toFixed(1)} ${data.name}`;
      }
    } else {
      let quantity = (data.quantity / babyRecipe.portion) * babyCounter;
      if (Number.isInteger(quantity)) {
        ingredientMapped = `${quantity.toFixed(0)} ${data.unit} de ${
          data.name
        }`;
      } else {
        ingredientMapped = `${quantity.toFixed(1)} ${data.unit} de ${
          data.name
        }`;
      }
    }
    return (
      <Chip key={i} style={styles.chip}>
        <Text style={styles.chipText}>{ingredientMapped}</Text>
      </Chip>
    );
  });

  //Conditions adult pour gérer les trous de la base sur unit/quantity
  const adultIngredientsChips = adultRecipe?.ingredients.map((data, i) => {
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
        data.unit === "null")
    ) {
      ingredientMapped = `${
        (Math.round((data.quantity / adultRecipe.portion) * 10) / 10) *
        adultCounter
      } ${data.name}`;

      let quantity = (data.quantity / adultRecipe.portion) * adultCounter;
      if (Number.isInteger(quantity)) {
        ingredientMapped = `${quantity.toFixed(0)} de ${data.name}`;
      } else {
        ingredientMapped = `${quantity.toFixed(1)} ${data.name}`;
      }
    } else {
      let quantity = (data.quantity / adultRecipe.portion) * adultCounter;
      if (Number.isInteger(quantity)) {
        ingredientMapped = `${quantity.toFixed(0)} ${data.unit} de ${
          data.name
        }`;
      } else {
        ingredientMapped = `${quantity.toFixed(1)} ${data.unit} de ${
          data.name
        }`;
      }
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

  useEffect(() => {
    setIsLiked(
      likedRecipes.baby.some((recipePair) => recipePair === babyRecipe) &&
        likedRecipes.adult.some((recipePair) => recipePair === adultRecipe)
    );
  }, [babyRecipe, adultRecipe, likedRecipes]);

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
              removeLikedRecipe({ baby: babyRecipe, adult: adultRecipe })
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

  // code to handle likes
  let heartIcon = "";
  if (isLiked) {
    heartIcon = (
      <TouchableOpacity
        onPress={() => {
          handleClickLike();
        }}
      >
        <Icon name="heart" size={32} color={theme.colors.primary} />
      </TouchableOpacity>
    );
  } else {
    heartIcon = (
      <TouchableOpacity
        onPress={() => {
          handleClickLike();
        }}
      >
        <Icon name="heart-outline" size={32} color={theme.colors.primary} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {weeklyRecipes.baby.length === 0 && weeklyRecipes.adult.length === 0 ? (
        <Animation />
      ) : (
        <View style={styles.container}>
          <Portal>
            <Dialog visible={isModalVisible} onDismiss={!isModalVisible}>
              <Dialog.Title
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: 20,
                  lineHeight: 28,
                }}
              >
                Une autre recette enfant ?
              </Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={(value) => setChecked(value)}
                  value={checked}
                >
                  <RadioButton.Item
                    label="Via une recette favorite"
                    value="first"
                    labelStyle={{
                      fontSize: 16,
                      lineHeight: 22,
                    }}
                  />
                  <Divider />
                  <RadioButton.Item
                    label="Via une recette spécifique"
                    value="second"
                    labelStyle={{
                      fontSize: 16,
                      lineHeight: 22,
                    }}
                  />
                  {/* <Divider />
                <RadioButton.Item
                  label="Pour une recette aléatoire"
                  value="third"
                  labelStyle={{
                    fontSize: 16,
                    lineHeight: 22,
                  }}
                /> */}
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  ANNULER
                </Button>
                <Button
                  onPress={() => {
                    if (checked === "first") {
                      navigation.navigate("FavoritesScreen");
                      setIsModalVisible(false);
                    } else if (checked === "second") {
                      navigation.navigate("SearchScreen");
                      setIsModalVisible(false);
                    }
                    // else if (checked === "third") {
                    //   console.log(
                    //     "Penser a faire la fonctionalité regeneration aléatoire",
                    //     checked
                    //   );
                    // }
                  }}
                >
                  CONFIRMER
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <View style={styles.titleContain}>
            <View style={styles.titleSwiper}>
              <TouchableOpacity
                style={
                  activeMenu === "midi"
                    ? styles.viewActive
                    : styles.viewInactive
                }
                onPress={() => {
                  setActiveMenu("midi");
                }}
              >
                <Text
                  style={
                    activeMenu === "midi"
                      ? styles.titleActive
                      : styles.titleInactive
                  }
                >
                  Midi
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.titleSeparator}>•</Text>
              </View>
              <TouchableOpacity
                style={
                  activeMenu === "soir"
                    ? styles.viewActive
                    : styles.viewInactive
                }
                onPress={() => {
                  setActiveMenu("soir");
                }}
              >
                <Text
                  style={
                    activeMenu === "soir"
                      ? styles.titleActive
                      : styles.titleInactive
                  }
                >
                  Soir
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconContain}>
              {heartIcon}
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                }}
              >
                <Icon name="refresh" size={36} color="black" />
              </TouchableOpacity>
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
              <Text style={styles.instructions}>
                {babyRecipe?.instructions}
              </Text>
            </View>
            <View style={styles.mainRecipe}>
              <Text style={styles.titleMainRecipe}>{adultRecipe?.title}</Text>
              <Text style={styles.ingredientsMainRecipe}>Ingrédients :</Text>
              <View style={styles.ingredientsChipsContainer}>
                {adultIngredientsChips}
              </View>
              <Text style={styles.instructionsMainRecipe}>Instructions :</Text>
              <Text style={styles.instructions}>
                {adultRecipe?.instructions}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
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
