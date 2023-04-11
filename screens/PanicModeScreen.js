import { StyleSheet, Text, SafeAreaView, View, ImageBackground, Image } from 'react-native';
import { Button, Chip, TextInput  } from "react-native-paper"; 
import { useState } from "react";

export default function PanicModeScreen({ navigation }) {
  const [text, setText] = useState("")

    return (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeArea}/>
    <ImageBackground source={require('../assets/headerOursonBackground.png')} style={styles.background}>
       <View></View>
        <Text style={styles.title}>PanicModeScreen</Text>
          <Text style={styles.text}>Il vous manque des ingrédients? Pas eu le temps de passer faire les courses? Dîtes nous ce que vous avez et nous vous proposons une recette enfant adaptée !</Text>
            <Text style={styles.text}>Dans mon frigo, il y a ...</Text>
              <TextInput
                style={styles.input}
                label="Ingrédients"
                mode='outlined' 
                value={text}
                onChangeText={text => setText(text)}
              />
              <Chip 
                style={styles.chip}>
                  <Text style={styles.chipText}>{text}</Text>
              </Chip>
                  <Button 
                  style={styles.button}
                  mode="contained"
                  title="Go to SearchedRecipe"
                  onPress={() => navigation.navigate('SearchedRecipeScreen')}
                  >Terminer</Button>
    </ImageBackground>
   </View>

 );
}

const styles = StyleSheet.create({
   
      
    background: {
      width: '100%',
      height: '100%',
      }, 
    button: {
        width: 180,
        height: 60,
        borderRadius:60,
        marginTop: 20,
        justifyContent: 'center',
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
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffff',
    },
    
    input: {
        width: 300,
        height: 56,
        marginBottom: 30,
    },

    safeArea: {
        flex: 1, 
        marginBottom: 35,
      }, 

    text: {
        fontFamily: "Roboto_Regular",
      },

    title: {
        fontFamily: "Bryndan_Write",
        fontSize: 40,
        fontWeight: 400,
        lineHeight: 64,
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 100,
      },
});