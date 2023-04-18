import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { Button, Chip, Searchbar, useTheme } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { addSearchedRecipe } from "../reducers/recipes";
import { useState } from "react";

export default function SearchScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [chips, setChips] = useState([]);
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // local state to store the recipe the user clicked on in the flatlist
  const [PanicModeRecipes, setPanicModRecipes] = useState([]); //all the recipes corresponding to searched chip keywords

const handleSubmit = () => {
    console.log("handleSubmit");
    console.log(searchValue);
    if (searchValue) {
      //request : get all the recipe titles corresponding to the searchValue of the chips
      fetch("https://back.ourson.app/recipes/panicMode", {
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
            PanicModeRecipes(data.recipes); 
          }
        });
    }
  };

  return (
    <>
      <Header navigation={navigation} />
        <View style={styles.container}>
          <View style={styles.elemContainer}>
            <Text style={styles.text}>Il vous manque des ingrédients ?
              Pas eu le temps de passer faire les courses ?
              Dîtes nous ce que vous avez et nous vous proposons une recette enfant adaptée !</Text>
            <Text style={styles.title}>Dans mon frigo, il y a...</Text>
              <View styles={{flex:1}}>
              <Searchbar
                style={styles.searchBar}
                placeholder="Ingrédients"
                onChangeText={(text) => setSearchValue(text)}
                value={searchValue}
                onIconPress={() => {
                 //add chip 
                 if(searchValue){
                  setChips([...chips, searchValue]);
                  setSearchValue("");
                 }
                }}
                //same behavior on "rechercher" touch of the keyboard than the icon search of the search bar 
                onSubmitEditing={() => {
                 //add chip
                 if(searchValue){
                  setChips([...chips, searchValue]);
                  setSearchValue("");
                 }
                }}
              />

              {chips.length > 0 && (
                <FlatList
                style={styles.ingredientsChipsContainer}
                data={chips}
                renderItem={({ item }) => (
                  <Chip
                    style={styles.chip}
                    onClose={() => {
                      // handle chip press, e.g. remove chip
                      setChips(chips.filter((chip) => chip !== item));
                    }}
                  >
                    {item}
                  </Chip>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                // contentContainerStyle={styles.ingredientsChipsContainer}
              />
              )}
              
              {/* {FlatListVisible && (
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
                        setFlatListVisible(false)
                        
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
              )} */}
            
            </View>
            <Button
              style={styles.button}
              contentStyle={{ width: 230, height: 60 }}
              mode="contained"
              onPress={() => handleSubmit()}
          >
            VITE G FAIM
          </Button>
          </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 60,
    justifyContent: "center",
    marginTop: 130,
    alignSelf: "center",
  },
  chip: {
    marginBottom: 6,
    marginRight: 6,
  },
  chipText: {
    flex: 1,
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
    ingredientsChipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      // alignItems: "center",
      marginBottom: 10,
      marginTop: 100,
      
    },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 45,
    marginTop: 3,
  },
  text: {
    fontFamily: "Roboto",
    lineHeight: 24,
  }, 
  searchBar: {
    width: "100%",
    marginTop: 15,
    position: 'absolute',
    borderRadius: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FFDAD4",
    
  },
  titresRecettes: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 20,
  }
});
