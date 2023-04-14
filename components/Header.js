import {
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";

import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import { IconButton } from "react-native-paper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentScreen } from "../reducers/user";

export default function Header({ navigation, currentScreen }) {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(currentScreen);

  let headerButton = "";
  console.log("currentTab", currentTab);
  if (currentTab === "DashboardScreen") {
    headerButton = (
      <TouchableOpacity
        style={{ marginTop: 27.5, marginLeft: 25 }}
        onPress={() => navigation.goBack()}
      >
        <IconButton icon="cog-outline" size={32} />
      </TouchableOpacity>
    );
  } else {
    headerButton = (
      <TouchableOpacity
        style={{ marginTop: 27.5, marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <IconButton icon="chevron-left" size={32} />
      </TouchableOpacity>
    );
  }
  return (
    <View>
      <SafeAreaView></SafeAreaView>
      <View style={{ width: "100%", height: 180, marginBottom: -70 }}>
        <ImageBackground
          source={require("../assets/headerOursonBackground.png")}
          style={styles.background}
        >
          {headerButton}
        </ImageBackground>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#FDF0ED",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            height: 60,
            paddingLeft: 45,
          }}
        >
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("DashboardScreen")}
          >
            <Text style={styles.tabLabel}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("MondayScreen")}
          >
            <Text style={styles.tabLabel}>Lundi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("TuesdayScreen")}
          >
            <Text style={styles.tabLabel}>Mardi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("WednesdayScreen")}
          >
            <Text style={styles.tabLabel}>Mercredi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("ThursdayScreen")}
          >
            <Text style={styles.tabLabel}>Jeudi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("FridayScreen")}
          >
            <Text style={styles.tabLabel}>Vendredi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("SaturdayScreen")}
          >
            <Text style={styles.tabLabel}>Samedi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("SundayScreen")}
          >
            <Text style={styles.tabLabel}>Dimanche</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("FavoritesScreen")}
          >
            <Text style={styles.tabLabel}>Favoris</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("PanicModeScreen")}
          >
            <Text style={styles.tabLabel}>Panic Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("ShoppingListScreen")}
          >
            <Text style={styles.tabLabel}>Liste de course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("TastedFoodScreen")}
          >
            <Text style={styles.tabLabel}>Diversification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Text style={styles.tabLabel}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  title: {
    fontFamily: "Bryndan_Write",
    fontSize: 57,
    fontWeight: 400,
    lineHeight: 64,
    textAlign: "center",
    marginTop: 100,
    marginBottom: 100,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    marginBottom: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  tabItem: { backgroundColor: "#FDF0ED", marginRight: 45 },
  tabLabel: { fontFamily: "Roboto-Bold", fontSize: 14 },
});
