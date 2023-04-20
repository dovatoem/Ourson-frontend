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
import { useState, useEffect } from "react";


export default function SearchScreen({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [chips, setChips] = useState([]); 
  const [panicModeRecipes, setPanicModeRecipes] = useState([])
  const [FlatListVisible, setFlatListVisible] = useState(false);
  const [chipsContainerVisible, setchipsContainerVisible] = useState(true)
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // local state to store the recipe the user clicked on in the flatlist

  
  const recipe = useSelector((state) => state.recipes.value.searchedRecipe);


const handleSubmit = () => {
    console.log("handleSubmit");
    console.log(chips);
    if (chips && chips.length > 0) {
      const ingredientsString = chips.join(", ");
      //request : get all the recipes corresponding to the value of the ingredients search pushed in the array chips 
      fetch("https://back.ourson.app/recipes/panicMode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: ingredientsString }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            const titles = data.recipes.map((recipe) => ({
              title: recipe.title,
            }));
            setRecipeTitles(titles);
            console.log(recipeTitles);
            setPanicModeRecipes(data.recipes);
          }
        });
    } 
  };

  
  // useEffect(() => {
  //   if (isFocused) {
  //     // Reset chipsContainerVisible to true when navigating back to SearchScreen
  //     setchipsContainerVisible(true);
  //   }
  // }, [isFocused]);

  

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
                  setchipsContainerVisible(true)
                  setFlatListVisible(false)
                 }
                }}
                //same behavior on "rechercher" touch of the keyboard than the icon search of the search bar 
                onSubmitEditing={() => {
                 //add chip
                 if(searchValue){
                  setChips([...chips, searchValue]);
                  setSearchValue(""); 
                  setchipsContainerVisible(true)
                  setFlatListVisible(false)
                 }
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
                  panicModeRecipes.map((recipe) => {
                    if(recipe.title === item.title){
                      dispatch(addSearchedRecipe(recipe)); // Dispatch in Redux store the searched recipes clicked on from the search bar to access them on SearchedRecipeScreen
                      setSelectedRecipe(recipe); 
                    }
                    navigation.navigate('SearchedRecipeScreen', { recipe: selectedRecipe});
                    setFlatListVisible(false)
                    setPanicModeRecipes([])
                    setRecipeTitles([])
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

              {chips.length > 0 && chipsContainerVisible && (
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
            
            </View>
            <Button
              style={styles.button}
              contentStyle={{ width: 230, height: 60 }}
              mode="contained"
              onPress={() =>{
                handleSubmit();
                setFlatListVisible(true),
                setchipsContainerVisible(false)
              }}
          >
            Terminer
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
    height: 40,
  },
  chipText: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    },
    dropDownMenu :{
      maxHeight: '50%',
      width: "100%",
      backgroundColor: 'white',
      opacity: 0.6,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 30,
      zIndex: 1, 
      marginTop: 77,
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
