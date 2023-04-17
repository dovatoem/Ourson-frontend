import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Title,
  Button,
  Paragraph,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { IconButton } from "react-native-paper";

//Redux
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";

//Navigation modules
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

//Tab navigation modules
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";

import HeroScreen from "./screens/HeroScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";

import OnBoardingScreen1 from "./screens/OnBoardingScreen1";
import OnBoardingScreen2 from "./screens/OnBoardingScreen2";
import OnBoardingScreen3 from "./screens/OnBoardingScreen3";
import MondayScreen from "./screens/Day1MondayScreen";
import TuesdayScreen from "./screens/Day2TuesdayScreen";
import WednesdayScreen from "./screens/Day3WednesdayScreen";
import ThursdayScreen from "./screens/Day4ThursdayScreen";
import FridayScreen from "./screens/Day5FridayScreen";
import SaturdayScreen from "./screens/Day6SaturdayScreen";
import SundayScreen from "./screens/Day7SundayScreen";
import TastedFoodScreen from "./screens/TastedFoodScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import PanicModeScreen from "./screens/PanicModeScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchedRecipeScreen from "./screens/SearchedRecipeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DashboardScreen from "./screens/DashboardScreen";
import RegenerateSearchScreen from "./screens/RegenerateSearchScreen";
import RegenerateFavScreen from "./screens/RegenerateFavScreen";
import Header from "./components/Header";
import user from "./reducers/user";
import household from "./reducers/household";
import recipes from "./reducers/recipes";

const store = configureStore({
  reducer: { user, household, recipes },
});

//SplashScreen
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(255, 107, 87)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 218, 212)",
    onPrimaryContainer: "rgb(65, 0, 0)",
    secondary: "rgb(119, 86, 81)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 212)",
    onSecondaryContainer: "rgb(44, 21, 18)",
    tertiary: "rgb(112, 92, 46)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(251, 223, 166)",
    onTertiaryContainer: "rgb(37, 26, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 25)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 25)",
    surfaceVariant: "rgb(245, 221, 218)",
    onSurfaceVariant: "rgb(83, 67, 65)",
    outline: "#FFDAD4",
    outlineVariant: "rgb(216, 194, 190)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 46)",
    inverseOnSurface: "rgb(251, 238, 236)",
    inversePrimary: "rgb(255, 180, 168)",
    elevation: {
      level0: "transparent",
      level1: "rgb(251, 241, 244)",
      level2: "rgb(249, 235, 237)",
      level3: "rgb(246, 229, 231)",
      level4: "rgb(245, 227, 229)",
      level5: "rgb(244, 223, 224)",
    },
    surfaceDisabled: "rgba(32, 26, 25, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 25, 0.38)",
    backdrop: "rgba(59, 45, 43, 0.4)",
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const [currentScreen, setCurrentScreen] = useState("Hero");

  // utiliser currentScreen avec un if pour stocker dans une variable
  // le header qui se declenchera uniquement si currentScreen===TabNavigator

  const [fontsLoaded] = useFonts({
    Bryndan_Write: require("./assets/fonts/Bryndan_Write.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Hero" component={HeroScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            <Stack.Screen
              name="OnBoardingScreen1"
              component={OnBoardingScreen1}
            />
            <Stack.Screen
              name="OnBoardingScreen2"
              component={OnBoardingScreen2}
            />
            <Stack.Screen
              name="OnBoardingScreen3"
              component={OnBoardingScreen3}
            />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="MondayScreen" component={MondayScreen} />
            <Stack.Screen name="TuesdayScreen" component={TuesdayScreen} />
            <Stack.Screen name="WednesdayScreen" component={WednesdayScreen} />
            <Stack.Screen name="ThursdayScreen" component={ThursdayScreen} />
            <Stack.Screen name="FridayScreen" component={FridayScreen} />
            <Stack.Screen name="SaturdayScreen" component={SaturdayScreen} />
            <Stack.Screen name="SundayScreen" component={SundayScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

            <Stack.Screen
              name="SearchedRecipeScreen"
              component={SearchedRecipeScreen}
            />
            <Stack.Screen
              name="ShoppingListScreen"
              component={ShoppingListScreen}
            />
            <Stack.Screen
              name="TastedFoodScreen"
              component={TastedFoodScreen}
            />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen name="PanicModeScreen" component={PanicModeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen
              name="RegenerateSearchScreen"
              component={RegenerateSearchScreen}
            />
            <Stack.Screen
              name="RegenerateFavScreen"
              component={RegenerateFavScreen}
            />
          </Stack.Navigator>
          <View onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
          </View>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
