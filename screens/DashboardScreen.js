import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Searchbar, Menu, Divider } from "react-native-paper";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import { addSearchedRecipe } from "../reducers/recipes";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [recipeTitles, setRecipeTitles] = useState([]);

  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    console.log("handleSubmit");
    console.log(searchValue);
    if (searchValue) {
      //request : get all the recipe titles corresponding to the searchValue of the SearchBar
      fetch("https://back.ourson.app/recipes/searchKeyWord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: searchValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            const titles = data.recipes.map((recipe) => ({
              title: recipe.title,
            }));
            console.log(titles);
            setRecipeTitles(titles);
            dispatch(addSearchedRecipe(data.recipes)); // Dispatch in Redux store the searched recipes clicked on from the search bar to access them on SearchScreen
          }
        });
    }
  };

  const onRecipeSelected = (selectedTitle) => {
    console.log(selectedTitle);
  };

  return (
    <View>
      <SafeAreaView />
      <Header navigation={navigation} currentScreen="DashboardScreen" />
      <ImageBackground
        source={require("../assets/dashboardBackground.png")}
        style={styles.background}
      >
        <View>
          <Searchbar
            style={styles.searchBar}
            placeholder="Rechercher une recette"
            onChangeText={(text) => setSearchValue(text)}
            value={searchValue}
            onIconPress={() => handleSubmit()}
            // icon={() => <MaterialCommunityIcons name="selection-search" size={30}/>}
          />
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <View style={{ paddingTop: 10 }}>
                <Divider />
              </View>
            }
          >
            {recipeTitles.map((title) => (
              <Menu.Item
                key={title}
                title={title}
                onPress={() => {
                  onRecipeSelected(title);
                  setVisible(false);
                }}
              />
            ))}
          </Menu>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ShoppingListScreen")}
            >
              <View style={styles.imageView}>
                <Image
                  source={require("../assets/shoppinglist.png")}
                  style={styles.cardImage}
                />
              </View>
              <View>
                <Text style={styles.screenName}>Liste de courses</Text>
                <Text style={styles.screenDescription} numberOfLines={3}>
                  Consulter les ingrédients dont j'ai besoin pour ma semaine
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("TastedFoodScreen")}
            >
              <View style={styles.imageView}>
                <Image
                  source={require("../assets/diversification.png")}
                  style={styles.cardImage}
                />
              </View>
              <View>
                <Text style={styles.screenName}>
                  Diversification alimentaire
                </Text>
                <Text style={styles.screenDescription} numberOfLines={2}>
                  Suivre ce que mon enfant a déjà goûté
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("FavoritesScreen")}
            >
              <View style={styles.imageView}>
                <Image
                  source={require("../assets/fav.png")}
                  style={styles.cardImage}
                />
              </View>
              <View>
                <Text style={styles.screenName}>Favoris</Text>
                <Text style={styles.screenDescription} numberOfLines={3}>
                  Consulter mes recettes favorites
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PanicModeScreen")}
            >
              <View style={styles.imageView}>
                <Image
                  source={require("../assets/panicmode.png")}
                  style={styles.cardImage}
                />
              </View>
              <View>
                <Text style={styles.screenName}>Panic Mode</Text>
                <Text style={styles.screenDescription} numberOfLines={2}>
                  Générer une recette avec ce que j'ai dans mon frigo
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 14,
    marginTop: 20,
    borderRadius: 20,
  },
  cardContainer: {
    height: "78%",
  },
  cardImage: {
    height: 75,
    width: 75,
    marginRight: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    height: "100%",
    width: "100%",
  },
  screenName: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 15,
  },
  screenDescription: {
    width: "55%",
    fontSize: 14,
  },
  searchBar: {
    marginLeft: 35,
    backgroundColor: "#ffff",
    width: "82%",
    marginBottom: 15,
    marginTop: 20,
  },
});
