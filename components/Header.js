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
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentScreen } from "../reducers/user";
import { useNavigationState } from "@react-navigation/native";

export default function Header({ navigation }) {
  //Defini grâce à la navigation quel est l'écran actuel et l'écran précedent
  const previousScreen = useNavigationState(
    (state) => state.routes[state.index - 1]?.name
  );

  const currentScreen = useNavigationState(
    (state) => state.routes[state.index].name
  );

  //Défini quel sera le bouton du header en fonction de la ou on est, RESET la navigation (=clean l'historique)
  //dans le cas où l'on vient de SignIn ou OnBoarding3 afin de ne pas pouvoir revenir sur ces écrans.
  const [headerButton, setHeaderButton] = useState(null);

  useEffect(() => {
    if (currentScreen === "DashboardScreen") {
      setHeaderButton(
        <TouchableOpacity
          style={{ marginTop: 22, marginLeft: 25 }}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <IconButton icon="cog-outline" size={32} />
        </TouchableOpacity>
      );
    } else if (
      currentScreen !== "DashboardScreen" &&
      (previousScreen === "SignIn" || previousScreen === "OnBoardingScreen3")
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: currentScreen }],
      });
    } else if (previousScreen === undefined) {
      setHeaderButton(
        <Text
          style={{
            fontFamily: "Bryndan_Write",
            fontSize: 36,
            marginTop: 32,
            marginLeft: 45,
          }}
        >
          Bienvenue !
        </Text>
      );
    } else {
      setHeaderButton(
        <TouchableOpacity
          style={{ marginTop: 22, marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <IconButton icon="chevron-left" size={32} />
        </TouchableOpacity>
      );
    }
  }, [currentScreen, previousScreen, navigation]);

  //Défini un index pour chaque écran afin de pouvoir setter le premier onglet sur chaque screen
  const index = [
    "DashboardScreen",
    "MondayScreen",
    "TuesdayScreen",
    "WednesdayScreen",
    "ThursdayScreen",
    "FridayScreen",
    "SaturdayScreen",
    "SundayScreen",
    "FavoritesScreen",
    "PanicModeScreen",
    "ShoppingListScreen",
    "TastedFoodScreen",
    "SearchScreen",
  ].indexOf(currentScreen);

  //Défini la liste des écrans afin de pouvoir ensuite définir quel est l'onglet actif et lui appliquer son style.
  let screens = [
    { screenName: "DashboardScreen", label: "Dashboard" },
    { screenName: "MondayScreen", label: "Lundi" },
    { screenName: "TuesdayScreen", label: "Mardi" },
    { screenName: "WednesdayScreen", label: "Mercredi" },
    { screenName: "ThursdayScreen", label: "Jeudi" },
    { screenName: "FridayScreen", label: "Vendredi" },
    { screenName: "SaturdayScreen", label: "Samedi" },
    { screenName: "SundayScreen", label: "Dimanche" },
    { screenName: "FavoritesScreen", label: "Favoris" },
    { screenName: "PanicModeScreen", label: "Panic Mode" },
    { screenName: "ShoppingListScreen", label: "Liste de course" },
    { screenName: "TastedFoodScreen", label: "Diversification" },
    { screenName: "SearchScreen", label: "Rechercher" },
  ];

  let menuTopBar = null;
  if (currentScreen === "FavoriteRecipeScreen") {
    menuTopBar = (
      <TouchableOpacity
        key={"FavoriteRecipeScreen"}
        style={[styles.tabItem, styles.tabItemActive]}
      >
        <Text style={styles.tabLabelActive}>Favoris</Text>
      </TouchableOpacity>
    );
  } else if (currentScreen === "SearchedRecipeScreen") {
    menuTopBar = (
      <TouchableOpacity
        key={"SearchedRecipeScreen"}
        style={[styles.tabItem, styles.tabItemActive]}
      >
        <Text style={styles.tabLabelActive}>Rechercher</Text>
      </TouchableOpacity>
    );
  } else if (currentScreen === "RegenerateFavScreen") {
    menuTopBar = (
      <TouchableOpacity
        key={"RegenerateFavScreen"}
        style={[styles.tabItem, styles.tabItemActive, styles.tabItemLong]}
      >
        <Text style={styles.tabLabelActive}>Régénerer une recette</Text>
      </TouchableOpacity>
    );
  } else if (currentScreen === "RegenerateSearchScreen") {
    menuTopBar = (
      <TouchableOpacity
        key={"RegenerateSearchScreen"}
        style={[styles.tabItem, styles.tabItemActive, styles.tabItemLong]}
      >
        <Text style={styles.tabLabelActive}>Régénerer une recette</Text>
      </TouchableOpacity>
    );
  } else {
    menuTopBar = screens.map((item) => {
      const isActive = currentScreen === item.screenName;
      return (
        <TouchableOpacity
          key={item.screenName}
          style={[styles.tabItem, isActive && styles.tabItemActive]}
          onPress={() => navigation.navigate(item.screenName)}
        >
          <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  return (
    <View>
      <SafeAreaView></SafeAreaView>
      <View style={{ width: "100%", height: 180, marginBottom: -80 }}>
        <ImageBackground
          source={require("../assets/headerOursonBackground.png")}
          style={styles.background}
        >
          {headerButton}
        </ImageBackground>
      </View>
      <View
        style={{
          backgroundColor: "#FDF0ED",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 60,
        }}
      >
        <ScrollView
          contentOffset={{ x: index * 110, y: 0 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#FDF0ED",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: 60,
            }}
          >
            {menuTopBar}
          </View>
        </ScrollView>
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
  tabItem: {
    backgroundColor: "#FDF0ED",
    height: "100%",
    width: 110,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemActive: {
    borderBottomColor: "#FF6B57",
    borderBottomWidth: 3,
  },
  tabItemLong: {
    width: 200,
  },
  tabLabel: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    color: "#E7BDB6",
  },
  tabLabelActive: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    color: "#FF6B57",
  },
});
