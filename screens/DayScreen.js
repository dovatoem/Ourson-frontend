import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { addPlace, removePlace } from "../reducers/user";

export default function DayScreen() {
  //   const dispatch = useDispatch();
  //   const user = useSelector((state) => state.user.value);

  //   const [city, setCity] = useState("");

  const handleSubmit = () => {
    fetch(`https://back.ourson.app/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // dispatch(addPlace(newPlace))
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{user.nickname}'s places</Text>

      <View style={styles.inputContainer}></View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {places}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
});
