import { Button, StyleSheet, Text, SafeAreaView, View, TextInput } from 'react-native';
// import { Button } from "react-native-paper"; 


export default function SignUpScreen({ navigation }) {
 return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.title}>Inscrivez-vous!</Text>
             <TextInput
                placeholder="Prénom"
                style={styles.input}
            />
          <TextInput
            placeholder="Email"
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
            textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
            autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
            style={styles.input}
          />
          <TextInput
            placeholder="Mot de passe"
            style={styles.input}
          />
     <Button
       title="Go to OnBoardingScreen1"
       onPress={() => navigation.navigate('OnBoardingScreen1')}
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