import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Header from "../components/Header";
import { updateShoppingList } from "../reducers/household";

export default function ShoppingListScreen({ navigation }) {
  const dispatch = useDispatch();
  const household = useSelector((state) => state.household.value);
  const user = useSelector((state) => state.user.value);
  const token = user.token;
  const [shopList, setShopList] = useState([]);  
  const [checkedIngredients, setCheckedIngredients] = useState(household.shoppingList); 
  const [checkboxStates, setCheckboxStates] = useState(
    shopList.map(() => false))

  // call function generateShoppingList at mounting of the screen
  useEffect(() => {
    generateShoppingList();
  }, []);

  // at unmount save updated checkedIngredients in reducer and in DB
  useEffect(() => {    
    const unsubscribe = navigation.addListener('beforeRemove', () => {         
      fetch("https://ourson-app-backend.vercel.app/recipes/updateShoppingList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token, shoppingList: checkedIngredients }),
    })
    .then((response) => response.json())
      .then((data) => {       
        console.log('fetchData', data);
        if (data.result) {
          dispatch(
            updateShoppingList(checkedIngredients));                  
          } else {
            console.log(data.error);
          }
        });
    });    
    return unsubscribe;
  }, [checkedIngredients, navigation]);

  // function generating a shopping list based on baby and adult weekly recipes without takig into account hhSize
  const generateShoppingList = () => {
    const mergedArray = [
      ...household.savedWeeklyRecipes.baby,
      ...household.savedWeeklyRecipes.adult,
    ];
    const shoppingList = [];
    mergedArray.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        let found = false;
        // allowing to sum for ingredients in singular vs plural
        for (const e of shoppingList) {
          if (e.name.endsWith("s")) {
            e.name = e.name.slice(0, -1);
          }
          if (ingredient.name.endsWith("s")) {
            ingredient.name = ingredient.name.slice(0, -1);
          }
          // adding quantity if same ingredient
          if (
            e.name === ingredient.name &&
            (e.unit === ingredient.unit ||
              (e.unit == "null" && ingredient.unit == "null") ||
              (e.unit == null && ingredient.unit == null) ||
              (e.unit == "null" && ingredient.unit == null) ||
              (e.unit == null && ingredient.unit == "null"))
          ) {
            e.quantity += ingredient.quantity;
            found = true;
            break;
          }
        }
        // if ingredient is not in shoppingList array, add it
        if (!found) {
          shoppingList.push({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          });
        }
      });
    });

    // to avoid duplicates, we remove ingredient in cuillères unit, and keep the other
    for (const e of shoppingList) {
      if (e.unit) {
        let index = shoppingList.findIndex(
          (g) => e.name === g.name && e.unit.includes("c. ")
        );
        if (index !== -1) {
          shoppingList.splice(index, 1);
        }
      }
    };

    // format shoppingList
    let formattedArray = [];
    shoppingList.map((data, i) => {     
      let ingredientMapped = '';
      if (
        typeof data.quantity === "undefined" ||
        data.quantity === null ||
        data.quantity === 0 ||
        data.quantity === "null" ||
        isNaN(data.quantity)
      ) {
        ingredientMapped = data.name;
        formattedArray.push(ingredientMapped);
      } else if (
        (data.unit === null || data.unit === "null") &&
        (data.quantity !== null || data.quantity === "null")
      ) {
        ingredientMapped = `${Math.round(data.quantity)} ${data.name}`;
        formattedArray.push(ingredientMapped);
      } else if (data.quantity <= 1) {
        ingredientMapped = `${Math.round(data.quantity)} ${data.unit} ${
          data.name
        }`;
        formattedArray.push(ingredientMapped);        
      } else {
        ingredientMapped = `${Math.round(data.quantity)} ${data.unit} de ${
          data.name
        }`;
        formattedArray.push(ingredientMapped);  
      }
    });
    setShopList(formattedArray);

    console.log('shopList', shopList);
    console.log('checkedIngredients', checkedIngredients);
    
  }
 
  // create the checkList based on shopList state
  const list = shopList.map((ingredient, i) => {    
    return (
      <BouncyCheckbox
        style={{ marginBottom: 16 }}
        key={i}
        size={30}
        fillColor="rgb(255, 107, 87)"
        unfillColor="#FFFFFF"
        text={ingredient}
        iconStyle={{ borderColor: "rgb(255, 107, 87)", borderRadius: 0 }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
        textStyle={{ fontFamily: "Roboto", textDecorationLine: "none" }}
        isChecked={checkboxStates[i]}
        disableBuiltInState
        onPress={() => {
          const newStates = [...checkboxStates];
          newStates[i] = !newStates[i];
          setCheckboxStates(newStates);
          newStates[i] ? setCheckedIngredients([...checkedIngredients, ingredient]) : setCheckedIngredients(checkedIngredients.filter(e => e !== ingredient ));        
          console.log('after click', checkedIngredients);
        }}
      />
    );
  });

  return (
    <>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Ici retrouvez tous les ingrédients dont vous avez besoin pour
            cusiner toutes les recettes de la semaine !
          </Text>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {list}
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 0.1, backgroundColor: "white" }}>
        <Text></Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 35,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: "3%",
  },
  scrollView: {
    padding: 25,
  },
  bottom: {
    marginBottom: "10%",
    backgroundColor: "red",
  },
});
