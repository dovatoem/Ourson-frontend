import { Button, StyleSheet, Text, SafeAreaView, View, TextInput } from 'react-native';
// import { Button } from "react-native-paper"; 


export default function DashboardScreen({ navigation }) {
 return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.title}>DashboardScreen</Text>
     <Button
       title="Liste de courses"
       onPress={() => navigation.navigate('ShoppingListScreen')}
     />
       <Button
       title="Diversification"
       onPress={() => navigation.navigate('TastedFoodScreen')}
     />
       <Button  
       title="Favoris"
       onPress={() => navigation.navigate('FavoritesScreen')}
     /> 
       <Button
       title="Panic Mode"
       onPress={() => navigation.navigate('PanicModeScreen')}
     />
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ADD8E6',
    },
    title: {
        fontFamily: "Bryndan_Write",
        fontSize: 57,
        fontWeight: 400,
        lineHeight: 64,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 100,
      },
});