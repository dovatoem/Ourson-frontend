import {
  StyleSheet, 
  View,
  ScrollView 
} from "react-native";
import { Text, Button} from "react-native-paper";
import Header from "../components/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const data = [
  { id: 1, title: 'brocoli', quantity: '3', unit: 'unité', isChecked: false },
  { id: 1, title: 'brocoli', quantity: '3', unit: 'unité', isChecked: false },
  { id: 1, title: 'brocoli', quantity: '3', unit: 'unité', isChecked: false },
  { id: 1, title: 'brocoli', quantity: '3', unit: 'unité', isChecked: false },
  { id: 1, title: 'brocoli', quantity: '3', unit: 'unité', isChecked: false },
  { id: 1, title: 'brocoli', quantity: '3', unit: 'unité', isChecked: false }  
];

export default function ShoppingListScreen({ navigation }) {
  const household = useSelector((state) => state.household.value);
  const [shopList, setShopList] = useState([]);

  const handleTest = () => {
    const listArray = [];
    const shoppingList = {title: "", quantity: "", unit: ""};
    household.savedWeeklyRecipes.baby.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (shoppingList.title === ingredient.name) {
          shoppingList.quantity += ingredient.quantity;
        } else {
          shoppingList.title = ingredient.name;
          shoppingList.quantity = ingredient.quantity;
          shoppingList.unit = ingredient.unit;
        }
        listArray.push(shoppingList);
      });
    });
   
    console.log('shoppingList baby', shoppingList);
    household.savedWeeklyRecipes.adult.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (shoppingList.title === ingredient.name) {
          shoppingList.quantity += ingredient.quantity;
        } else {
          shoppingList.title = ingredient.name;
          shoppingList.quantity = ingredient.quantity;
          shoppingList.unit = ingredient.unit;
        }
      });
    });  
    console.log('shoppingList baby+adult', shoppingList);      
  }  
    
  const list = data.map((e, i) => { 
    let line = `${e.quantity} ${e.unit} ${e.title}`;   
    return <BouncyCheckbox style={{ marginBottom: 16 }} 
    key={i}
    size={30}
    fillColor="rgb(255, 107, 87)"
    unfillColor="#FFFFFF"
    text={line}
    iconStyle={{ borderColor: "rgb(255, 107, 87)", borderRadius: 0, }}
    innerIconStyle={{ borderWidth: 2, borderRadius: 0,}}
    textStyle={{ fontFamily: "Roboto", textDecorationLine: "none", }}
    onPress={(isChecked: boolean) => {}}  
  /> 
  }); 

  return (
    <>
      <Header navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Ici retrouvez tous les ingrédients dont vous avez besoin pour cusiner toutes les recettes de la semaine !</Text>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}> 
         {list}
        </ScrollView> 
        <Button
            style={styles.button}
            contentStyle={{ width: 180, height: 60 }}
            mode="contained"
            onPress={() => handleTest()}
          >
            Test
          </Button>      
      </View>        
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
    marginBottom: '20%',
  },
  checkbox: {
   
  }
});
