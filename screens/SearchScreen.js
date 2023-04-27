import { StyleSheet, Text, View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { addSearchedRecipe } from "../reducers/recipes";

import Header from "../components/Header";

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [FlatListVisible, setFlatListVisible] = useState(false);
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // local state to store the recipe the user clicked on in the flatlist
  const [searchedRecipes, setSearchedRecipes] = useState([]); //all the recipes corresponding to searched keyword

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
            setRecipeTitles(titles);
            console.log(recipeTitles);
            setSearchedRecipes(data.recipes);
          }
        });
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.elemContainer}>
          <Text style={styles.title}>Regénérer la recette enfant</Text>
          <Text style={styles.text}>
            Envie d’une recette enfant particulière ? Recherchez directement par
            titre celle qui vous fait envie !
          </Text>

          <View styles={{ flex: 1 }}>
            <Searchbar
              style={styles.searchBar}
              placeholder="Rechercher une recette enfant"
              onChangeText={(text) => setSearchValue(text)}
              value={searchValue}
              onIconPress={() => {
                handleSubmit(), setFlatListVisible(true);
              }}
              //same behavior on "rechercher" touch of the keyboard than the icon search of the search bar
              onSubmitEditing={() => {
                handleSubmit();
                setFlatListVisible(true);
              }}
              onClearIconPress={() => {
                setFlatListVisible(false);
              }}
            />
            <View style={{ flex: 0, height: 0 }}>
              {/* empty view to prevent top of list from being cut off */}
            </View>
            {FlatListVisible && (
              <FlatList
                data={recipeTitles}
                renderItem={({ item }) => (
                  <Text
                    onPress={() => {
                      console.log("recipe clicked:", item.title);
                      searchedRecipes.map((recipe) => {
                        if (recipe.title === item.title) {
                          dispatch(addSearchedRecipe(recipe)); // Dispatch in Redux store the searched recipes clicked on from the search bar to access them on SearchedRecipeScreen
                          setSelectedRecipe(recipe);
                        }
                        navigation.navigate("SearchedRecipeScreen", {
                          recipe: selectedRecipe,
                        });
                        setFlatListVisible(false);
                      });
                    }}
                    style={styles.titresRecettes}
                  >
                    {item.title}
                  </Text>
                )}
                keyExtractor={(item) => item.title}
                style={styles.dropDownMenu}
              />
            )}
            {!FlatListVisible && <View style={{ height: 0, flexShrink: 1 }} />}
            <View style={{ flex: 1 }}>
              {/* empty view to push list to bottom of screen */}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 60,
    justifyContent: "center",
    marginTop: 200,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  elemContainer: {
    margin: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 45,
  },
  text: {
    fontFamily: "Roboto",
    lineHeight: 24,
    marginTop: 20,
  },
  dropDownMenu: {
    position: "relative",
    maxHeight: "50%",
    width: "100%",
    backgroundColor: "white",
    opacity: 0.6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    zIndex: 1,
    marginTop: "30%",
  },
  searchBar: {
    width: "100%",
    marginTop: 35,
    position: "absolute",
    borderRadius: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FFDAD4",
  },
  titresRecettes: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
