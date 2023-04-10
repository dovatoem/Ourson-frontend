import { Button } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import { Chip } from "react-native-paper";
import { useState } from "react";

export default function DayScreen() {
  const theme = useTheme();
  // <Icon name="heart-outline" size={32} color={theme.colors.primary}  />

  const babyRecipe = {
    _id: {
      $oid: "6432dc34c38b94ff05a21bf9",
    },
    Page_URL: "https://www.cuisinez-pour-bebe.fr/puree-de-navet/",
    title: "Purée de navet",
    usage: "repas",
    ageMonths: 4,
    imageURL:
      "https://cdn.cuisinez-pour-bebe.fr/wp-content/uploads/2021/10/puree-de-navet.jpg",
    totalTime: 25,
    portions: 1,
    diet: null,
    ingredients: [{ name: "navet", quantity: 150, unit: "g" }],
    instructions:
      "Laver et éplucher les navets. Les couper en petits morceaux.\nCuire les navets à la vapeur (15 à 20 minutes environ).\nVérifier la cuisson avec la pointe du couteau : les navets doivent être fondants.\nLorsqu’ils sont cuits, mixer les navets en purée lisse.",
  };

  const adultRecipe = {
    _id: {
      $oid: "6432dc34c38b94ff05a21bf9",
    },
    Page_URL:
      "https://www.cuisineactuelle.fr/recettes/gratin-de-legumes-dhiver-au-four-216169",
    title: "Gratin de légumes d’hiver au four",
    usage: "repas",
    imageURL:
      "https://www.cuisineactuelle.fr/imgre/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fcac.2F2023.2F02.2F16.2F5900321a-c736-437f-b118-135442ba7194.2Ejpeg/555x276/quality/80/crop-from/center/gratin-de-legumes-d-hiver-au-four.jpeg",
    totalTime: 85,
    portions: 4,
    diet: null,
    ingredients: [
      { name: "Betterave rouge crue", quantity: 1, unit: "unité" },
      { name: "Navet blanc rond", quantity: 1, unit: "unité" },
      { name: "Navet boule or", quantity: 1, unit: "unité" },
      { name: "Petite patate douce", quantity: 1, unit: "unité" },
      { name: "Chair de butternut", quantity: 200, unit: "g" },
      { name: "Béchamel", quantity: 20, unit: "cl" },
      { name: "Fromage de chèvre frais", quantity: 100, unit: "g" },
      { name: "Pain de mie rassis", quantity: 2, unit: "tranches" },
      { name: "Cacahuètes", quantity: 20, unit: "g" },
      { name: "Parmesan râpé", quantity: 2, unit: "cuil. à soupe" },
      { name: "Sel", quantity: null, unit: null },
      { name: "Poivre", quantity: null, unit: null },
    ],
    instructions:
      "Toastez les tranches de pain de mie. Mixez les tranches toastées avec les cacahuètes et le parmesan râpé. Pelez la betterave, les navets et la patate douce. Passez l’ensemble de vos légumes à la mandoline afin de réaliser des rondelles régulières. Dans un petit saladier, mélangez la béchamel avec le fromage de chèvre frais. Disposez harmonieusement vos rondelles de légumes en les alternant dans un plat à gratin. Nappez l’ensemble de béchamel. Enfournez à 180 °C pendant 50 minutes. Saupoudrez la surface de votre gratin de chapelure au parmesan. Enfournez pour 10 minutes de cuisson supplémentaires.",
  };

  const [activeMenu, setActiveMenu] = useState("Midi");
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [babyCounter, setBabyCounter] = useState(babyRecipe.portions);
  const [adultCounter, setAdultCounter] = useState(adultRecipe.portions);

  // const [city, setCity] = useState("");
  // const [city, setCity] = useState("");
  // const [city, setCity] = useState("");

  const babyIngredientsChips = babyRecipe.ingredients.map((data, i) => {
    let ingredientMapped = "";
    if (data.quantity === null || data.unit === null) {
      ingredientMapped = data.name;
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

  const adultIngredientsChips = adultRecipe.ingredients.map((data, i) => {
    let ingredientMapped = "";
    if (data.quantity === null || data.unit === null) {
      ingredientMapped = data.name;
    } else {
      ingredientMapped = `${
        (data.quantity / adultRecipe.portions) * adultCounter
      } ${data.unit} de ${data.name}`;
    }
    return (
      <Chip key={i} style={styles.chip}>
        <Text style={styles.chipText}>{ingredientMapped}</Text>
      </Chip>
    );
  });

  const handleClickPortionsBaby = (data) => {
    if (data === "sub") {
      setBabyCounter(babyCounter - 1);
    } else {
      setBabyCounter(babyCounter + 1);
    }
  };

  const handleClickPortionsAdult = (data) => {
    if (data === "sub") {
      setAdultCounter(adultCounter - 1);
    } else {
      setAdultCounter(adultCounter + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContain}>
        <View style={styles.titleSwiper}>
          <View style={styles.viewActive}>
            <Text style={styles.titleActive}>Midi</Text>
          </View>
          <View>
            <Text style={styles.titleSeparator}>•</Text>
          </View>
          <View>
            <Text style={styles.titleInactive}>Soir</Text>
          </View>
        </View>
        <View style={styles.iconContain}>
          <Icon name="heart" size={32} color={theme.colors.primary} />
          <Icon name="refresh" size={36} color="black" />
        </View>
      </View>

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
                  uri: adultRecipe.imageURL,
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
                <Text style={styles.recipeTitle}>{adultRecipe.title}</Text>
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
          <Text style={styles.titleMainRecipe}>{babyRecipe.title}</Text>
          <Text style={styles.ingredientsMainRecipe}>Ingrédients :</Text>
          <View style={styles.ingredientsChipsContainer}>
            {babyIngredientsChips}
          </View>
          <Text style={styles.instructionsMainRecipe}>Instructions :</Text>
          <Text style={styles.instructions}>{babyRecipe.instructions}</Text>
        </View>
        <View style={styles.mainRecipe}>
          <Text style={styles.titleMainRecipe}>{adultRecipe.title}</Text>
          <Text style={styles.ingredientsMainRecipe}>Ingrédients :</Text>
          <View style={styles.ingredientsChipsContainer}>
            {adultIngredientsChips}
          </View>
          <Text style={styles.instructionsMainRecipe}>Instructions :</Text>
          <Text style={styles.instructions}>{adultRecipe.instructions}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 30,
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
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 32,
    color: "rgb(255, 107, 87)",
  },
  viewActive: {
    borderBottomColor: "rgb(255, 107, 87)",
    borderBottomWidth: "2",
  },
  titleSeparator: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 32,
    marginLeft: 4,
    marginRight: 4,
  },
  titleInactive: {
    fontFamily: "Roboto",
    fontWeight: "bold",
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
    fontWeight: "bold",
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
});
