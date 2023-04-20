import {
  StyleSheet, 
  View,
  ScrollView 
} from "react-native";
import { Text, Button} from "react-native-paper";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ShoppingListScreen({ navigation }) {
  const household = useSelector((state) => state.household.value);
  const [shopList, setShopList] = useState([]);
  
  // call function generateShoppingList at mounting of the screen
  useEffect(() => {
    generateShoppingList();    
  }, []);

  // function generating a shopping list based on baby and adult weekly recipes without takig into account hhSize
  const generateShoppingList = () => {
    const mergedArray = [...household.savedWeeklyRecipes.baby, ...household.savedWeeklyRecipes.adult];
    const shoppingList = [];
    mergedArray.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {        
        let found = false;     
        // allowing to sum for ingredients in singular vs plural   
        for (const e of shoppingList) {  
          if (e.name.endsWith('s')) {
            e.name = e.name.slice(0, -1);            
          };
          if (ingredient.name.endsWith('s')) {
            ingredient.name = ingredient.name.slice(0, -1);           
          };
          // adding quantity if same ingredient
          if (e.name === ingredient.name && (e.unit === ingredient.unit || (e.unit == 'null' && ingredient.unit == 'null' ) || (e.unit == null && ingredient.unit == null) || (e.unit == 'null' && ingredient.unit == null) || (e.unit == null && ingredient.unit == 'null'))) {
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
            checked: false,
          });          
        }
      });
    }); 
    // to avoid duplicates, we remove ingredient in cuillères unit, and keep the other   
    for (const e of shoppingList) {
      if (e.unit) {
        let index = shoppingList.findIndex(g => e.name === g.name && e.unit.includes("c. "));
        if (index !== -1) {                       
          shoppingList.splice(index, 1);          
        }
      } 
    }; 
    setShopList(shoppingList);            
  } 
    
  // create the checkList based on shopList state
  const list = shopList.map((data, i) => { 
    let ingredientMapped = `${data.quantity} ${data.unit} ${data.name}`;
    if (typeof data.quantity === "undefined" || 
    data.quantity === null || 
    data.quantity === 0 || 
    data.quantity === "null" || 
    isNaN(data.quantity) ) {
      ingredientMapped = data.name;
    } else if (
      (data.unit === null || data.unit === "null") && 
      (data.quantity !== null || data.quantity === "null") ) {
      ingredientMapped = `${(Math.round(data.quantity))} ${data.name}`;
    } else if (data.quantity <= 1) {
      ingredientMapped = `${(Math.round(data.quantity))} ${data.unit} ${data.name}`;
    } else {
      ingredientMapped = `${(Math.round(data.quantity))} ${data.unit} de ${data.name}`;
    }
    return <BouncyCheckbox style={{ marginBottom: 16 }} 
    key={i}
    size={30}
    fillColor="rgb(255, 107, 87)"
    unfillColor="#FFFFFF"
    text={ingredientMapped}
    iconStyle={{ borderColor: "rgb(255, 107, 87)", borderRadius: 0, }}
    innerIconStyle={{ borderWidth: 2, borderRadius: 0,}}
    textStyle={{ fontFamily: "Roboto", textDecorationLine: "none", }}
    onPress={(isChecked: boolean) => {}}  
  /> 
  }); 

  return (
    <>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Ici retrouvez tous les ingrédients dont vous avez besoin pour cusiner toutes les recettes de la semaine !</Text>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}> 
         {list}
        </ScrollView>                     
      </View>            
      </View> 
      <View style={{flex: 0.1, backgroundColor: "white"}}>
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
    marginBottom: '3%',
  },  
  scrollView: {
    padding: 25,
  },
  bottom: {
    marginBottom: "10%",  
    backgroundColor: 'red'  
  },
});
