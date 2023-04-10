import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { Button } from "react-native-paper"; //composant particulier de react native paper 

export default function HeroScreen({ navigation }) {

  
    return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.view}>
        <Image style={styles.image} source={require('../assets/icon.png')} />
        <Text style={styles.text}>Ourson</Text>
            <View style={styles.buttonContainer}>
            <View style={styles.circle}></View>
                <Button style={styles.button}
                mode="contained"
                onPress={() => navigation.navigate('SignIn')}
                title="Se connecter">
                Se connecter</Button>
                <Button style={styles.button}
                mode="outlined"
                onPress={() => navigation.navigate('SignUp')}
                title="S'inscrire">
                S'inscrire</Button>
            </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFC219'
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 290,
        height: 320,
        marginTop: -180,
        marginBottom: 30,
    },
    text: {
        fontFamily: "Bryndan_Write",
        fontSize: 57,
        fontWeight: 400,
        lineHeight: 64,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 100,
      },

      buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        position: 'absolute', 
        bottom: 30,
      },
    
    button: {
        width: 180,
        height: 60,
        borderRadius:60,
        marginTop: 20,
        justifyContent: 'center',
    },

    circle: {
      width: 700,
      height: 700,
      borderRadius: 350,
      top: -80,
      backgroundColor: 'white',
      position: 'absolute',
      marginTop: 35,
    }
});