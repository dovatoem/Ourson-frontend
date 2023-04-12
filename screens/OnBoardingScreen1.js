import { StyleSheet, KeyboardAvoidingView, ImageBackground, View } from 'react-native';
import { Button, TextInput, Text } from "react-native-paper"; 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';


export default function  OnBoardingScreen1({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

   // local states saving the user inputs
   const [hhSize, setHhSize] = useState('');
   const [kidsCount, setKidsCount] = useState('');
   

 return (

  <View style={styles.container}>
    <SafeAreaView style={styles.safeArea}/>
    <ImageBackground source={require('../assets/onBoardingBackground.png')} style={styles.background}>
      <Text style={styles.headerTitle}>Bienvenue {user.firstName}!</Text>
       <Text style={styles.headerText}>Pour vous offrir une expérience unique, nous avons besoin de quelques précisions</Text>
       <Text style={styles.title}>Votre foyer</Text>
       <TextInput 
          onChangeText={(value) => setHhSize(value)} 
          mode="outlined" 
          label="Nombre de personnes" 
          style={styles.input} />
        <Text style={styles.title}>Vos enfants</Text>
        <TextInput
          onChangeText={(value) => setKidsCount(value)} 
          mode="outlined" 
          label="Nombre d'enfants(s)" 
          style={styles.input} />
        {/* <TextInput
                    placeholder="Prénom du 1er enfant"
                    style={styles.input}
                />
        <TextInput
                    placeholder="Age du 1er enfant en mois"
                    style={styles.input}
                /> */}
         <Button style={styles.button} mode="contained" onPress={() => handleSubmit()}>Continuer</Button>
    </ImageBackground>
    
   </View>

 );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  }, 
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffff',
    },
  title: {
        fontFamily: "Roboto_Regular",
        fontSize: 57,
        fontWeight: 400,
        lineHeight: 64,
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 100,
      },
     safeArea: {
        flex: 1, 
        marginBottom: 35,
      },  
    input: {
        margin: 5, 
        width: '85%',
        backgroundColor: 'white'
    },
    button: {
      width: 180,
      height: 60,
      borderRadius:60,
      justifyContent: 'center',
    },
});