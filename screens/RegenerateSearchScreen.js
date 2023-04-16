import { StyleSheet, SafeAreaView, View } from "react-native";
import { Button, TextInput, Text, ProgressBar } from "react-native-paper";

export default function RegenerateSearchScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>RegenerateSearchScreen</Text>
      <Button
        title="Go to Dashboard"
        contentStyle={{ width: 180, height: 60 }}
        onPress={() => navigation.navigate("Dashboard")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADD8E6",
  },
  title: {
    fontFamily: "Bryndan_Write",
    fontSize: 57,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 100,
  },
});
