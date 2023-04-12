import { Button, StyleSheet, Text, SafeAreaView, View, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Searchbar,  IconButton } from 'react-native-paper';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DashboardScreen({ navigation }) {

  const [searchValue, setSearchValue] = useState('');
  const onChangeSearch = researchText => setSearchValue(researchText);

 return (
    <SafeAreaView >
      <View>
      <ImageBackground source={require('../assets/dashboardBackground.png')} style={styles.background}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Searchbar style={styles.searchBar}
          placeholder="Rechercher une recette"
          onChangeText={onChangeSearch}
          value={searchValue}
          // icon={() => <MaterialCommunityIcons name="selection-search" size={30}/>}
        />
      </View>
       <View style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('ShoppingListScreen')}>
            <View style={styles.imageView}>
              <Image source={require('../assets/shoppinglist.png')} style={styles.cardImage} />
            </View>
            <View>
              <Text style={styles.screenName}>Liste de courses</Text>
              <Text style={styles.screenDescription}  numberOfLines={3} >Consulter les ingrédients dont j'ai besoin pour ma semaine</Text>
            </View> 
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('TastedFoodScreen')}>
            <View style={styles.imageView}>
              <Image source={require('../assets/diversification.png')} style={styles.cardImage} />
            </View>
            <View>
              <Text style={styles.screenName}>Diversification alimentaire</Text>
              <Text style={styles.screenDescription}  numberOfLines={2} >Suivre ce que mon enfant a déjà goûté</Text>
            </View> 
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('FavoritesScreen')}>
            <View style={styles.imageView}>
              <Image source={require('../assets/fav.png')} style={styles.cardImage} />
            </View>
            <View>
              <Text style={styles.screenName}>Favoris</Text>
              <Text style={styles.screenDescription}  numberOfLines={3} >Consulter mes recettes favorites</Text>
            </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('PanicModeScreen')}>
            <View style={styles.imageView}>
              <Image source={require('../assets/panicmode.png')} style={styles.cardImage} />
            </View>
            <View>
              <Text style={styles.screenName}>Panic Mode</Text>
              <Text style={styles.screenDescription}  numberOfLines={2} >Générer une recette avec ce que j'ai dans mon frigo</Text>
            </View> 
        </TouchableOpacity>
      </View>
     </ImageBackground>
     </View>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 18,
    marginTop: 20,
    borderRadius: 20,
  },
  cardImage: {
    height: 75, 
    width: 75,
    marginRight: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
    background : {
      height: '100%',
      width: '100%',
    },
    screenName :{
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 15,
    }, 
    screenDescription: {
      width: '55%',
      fontSize: 14,
    }, 
    searchBar: {
      marginLeft: 35,
      backgroundColor: '#ffff',
      width: '82%',
      marginBottom: 20,
      marginTop: 100,
    }

});