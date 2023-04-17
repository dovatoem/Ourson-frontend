import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView, 
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import { addSearchedRecipe } from "../reducers/recipes";
import { useDispatch, useSelector } from "react-redux";


export default function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // local state to store the recipe the user clicked on in the flatlist
  const [searchedRecipes, setSearchedRecipes] = useState([]); //all the recipes corresponding to searched keyword
  const [FlatListVisible, setFlatListVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(true);
 
  const recipe = useSelector((state) => state.recipes.value);

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

  useEffect(() => { 
    if (recipe.searchedRecipe) {
      console.log("recette dans le reducer:",recipe.searchedRecipe)
      
    }
  }, [recipe.searchedRecipe]);

  return (
    <View >
      <SafeAreaView />
      <Header navigation={navigation} />
      <ImageBackground
        source={require("../assets/dashboardBackground.png")}
        style={styles.background}
      >
       
        <View styles={{flex:1}}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Rechercher une recette"
            onChangeText={(text) => setSearchValue(text)}
            value={searchValue}
            onIconPress={() => {
              handleSubmit(),
              setFlatListVisible(true),
              setDashboardVisible(false)
            }}
            onClearIconPress= {() => {
              setFlatListVisible(false),
              setDashboardVisible(true)
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
                  console.log("recipe clicked:", item.title)
                  searchedRecipes.map((recipe) => {
                    if(recipe.title === item.title){
                      dispatch(addSearchedRecipe(recipe)); // Dispatch in Redux store the searched recipes clicked on from the search bar to access them on SearchedRecipeScreen
                      setSelectedRecipe(recipe); 
                    }
                    navigation.navigate('SearchedRecipeScreen', { recipe: selectedRecipe});
                    
                  })
                }
              } 
                
                style={styles.titresRecettes}>{item.title}</Text>
              )}
              keyExtractor={(item) => item.title}
              style={styles.dropDownMenu}
            />
          )}
          {!FlatListVisible && (
            <View style={{height: 0, flexShrink: 1}}/>
          )}
          <View style={{ flex: 1 }}>
            {/* empty view to push list to bottom of screen */}
          </View>
        </View>


    {dashboardVisible && (
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
        )}

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
    height: "45%",
    marginTop: '20%',
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
  dropDownMenu :{
    position: 'relative',
    left: "10%",
    right: "10%",
    maxHeight: '50%',
    width: "80%",
    backgroundColor: 'white',
    opacity: 0.6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    zIndex: 1, 
    marginTop: '20%',
  },
  screenName: {
    fontFamily: 'Roboto',
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
    backgroundColor: "white",
    width: "82%",
    marginBottom: 15,
    marginTop: 20,
    position: 'absolute',
  },
  title: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  }, 
  titresRecettes: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 20,
  }
});
