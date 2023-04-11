import { Button, StyleSheet, Text, SafeAreaView, View, TextInput } from 'react-native';
// import { Button } from "react-native-paper"; 


export default function SignInScreen({ navigation }) {
 return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.title}>Se connecter</Text>
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
     <Button style={styles.button}
       title="Se connecter (--> DayScreen) "
       onPress={() => navigation.navigate('DayScreen')}
     />
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#B4D3B2',
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
    button: {
      width: 180,
      height: 60,
      borderRadius:60,
      marginTop: 20,
      justifyContent: 'center',
  },
}); 