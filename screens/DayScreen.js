import { Button, StyleSheet, Text, SafeAreaView, View } from 'react-native';

export default function DayScreen({ navigation }) {
 return (
    <SafeAreaView style={styles.container}>
     <Text>NESTED NAVIGATION ????</Text>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'purple',
    },
}); 