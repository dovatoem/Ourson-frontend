import { Button, StyleSheet, Text, SafeAreaView, View, TextInput, ImageBackground, Image } from 'react-native';
// import { Button } from "react-native-paper"; 


export default function  OnBoardingScreen1({ navigation }) {
 return (

  <View style={styles.container}>
    <SafeAreaView style={styles.safeArea}/>
    <ImageBackground source={require('../assets/onBoardingBackground.png')} style={styles.background}>
        <Text style={styles.title}>Bienvenue $prénom!</Text>
        <Text style={styles.text}>Pour vous offrir une expérience unique, nous avons besoin de quelques précisions</Text>
        
        <Text style={styles.text}>Votre foyer</Text>
                <TextInput
                    placeholder="Nombre de personnes"
                    style={styles.input}
                />
        <Text style={styles.text}>Vos enfants</Text>
                <TextInput
                    placeholder="Nombre d'enfants"
                    autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                    keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                    textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                    autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
                    style={styles.input}
                />
                <TextInput
                    placeholder="Prénom du 1er enfant"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Age du 1er enfant en mois"
                    style={styles.input}
                />
        <Button
        title="Continuer --> Go to OnBoardingScreen2"
        onPress={() => navigation.navigate('OnBoardingScreen2')}
        />
    </ImageBackground>
    
   </View>

 );
}

const styles = StyleSheet.create({
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
    background: {
        width: '100%',
        height: '100%',
      }, 
    safeArea: {
        flex: 1, 
        marginBottom: 35,
      },  
     input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
});