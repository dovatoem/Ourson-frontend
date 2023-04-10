import { StyleSheet, Text, SafeAreaView, View, TextInput, ImageBackground, Image } from 'react-native';
import { Button, Chip } from "react-native-paper"; 
import {Tabs,TabScreen, useTabIndex, useTabNavigation,} from 'react-native-paper-tabs';

export default function TastedFoodScreen({ navigation }) {
    return (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeArea}/>
    <ImageBackground source={require('../assets/headerOursonBackground.png')} style={styles.background}>
        <Text style={styles.title}>$prénom a déjà goûté...</Text>
        <Text style={styles.text}>Légumes</Text>
        <Text style={styles.text}>2/30 légumes goûtés</Text>
        <Chip>Peppers</Chip>
        <Text style={styles.text}>Fruits</Text>
        <Text style={styles.text}>1/30 fruits goûtés</Text>
        <Chip>Chile Peppers</Chip>
    </ImageBackground>
   </View>

 );
}

function Example() {
    return (
      <Tabs
        defaultIndex={0} 
        uppercase={false} 
        showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        style={{ backgroundColor:'#ffff' }} // works the same as AppBar in react-native-paper
        dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        disableSwipe={true} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="Diversification">
           <ExploreWitHookExamples />
        </TabScreen>
        <TabScreen label="Favoris" disabled>
          <View style={{ backgroundColor: 'black', flex:1 }} />
        </TabScreen>
        <TabScreen
          label="Liste de courses"
          onPressIn={() => {
            console.log('onPress Divers');
          }}
        >
           <View style={{ backgroundColor: 'red', flex:1 }} />
        </TabScreen>
      </Tabs>
    )
}

function ExploreWitHookExamples() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex:1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
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
        fontFamily: "Bryndan_Write",
        fontSize: 57,
        fontWeight: 400,
        lineHeight: 64,
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 100,
      },
      text: {
        fontFamily: "Roboto_Regular",
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