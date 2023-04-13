import {
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { IconButton } from "react-native-paper";

export default function Header({ navigation }) {
  return (
    <View>
      <SafeAreaView></SafeAreaView>
      <View style={{ width: "100%", height: 180, marginBottom: -70 }}>
        <ImageBackground
          source={require("../assets/headerOursonBackground.png")}
          style={styles.background}
        >
          <TouchableOpacity
            style={{ marginTop: 27, marginLeft: 10 }}
            onPress={() => console.log("click")}
          >
            {/* <IconButton icon="chevron-left" size={32} /> */}
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  tabBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
