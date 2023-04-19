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
  
  useEffect(() => {
    handleTest();    
  }, []);

  const handleTest = () => {
    const shoppingList = [];    
    household.savedWeeklyRecipes.baby.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        console.log('ingredient', ingredient);
        let found = false;
        for (const e of shoppingList) {
          if (e.name === ingredient.name && e.unit === ingredient.unit) {
            e.quantity += ingredient.quantity;
            found = true;
            break;
          }
        }
        if (!found) {
          shoppingList.push({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          });          
        }
      });
    });    
    for (const e of shoppingList) {
      if (e.unit) {
        let index = shoppingList.findIndex(g => e.name === g.name && g.unit.includes("c. "));
        if (index !== -1) {                       
          shoppingList.splice(index, 1);          
        }
      } 
    }; 
    setShopList(shoppingList);            
  } 
    
  const list = shopList.map((data, i) => { 
    let ingredientMapped = "";
    if (data.quantity === null || data.quantity === 0 || data.quantity === "null") {
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
