import { useCallback } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";

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
  const [fontsLoaded] = useFonts({
    Bryndan_Write: require("./assets/fonts/Bryndan_Write.ttf"),
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
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text style={styles.text}>Ourson</Text>
        <Button
          mode="contained"
          onPress={() => console.log("Sign in button", "Pressed")}
        >
          Se connecter
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log("Sign up button", "Pressed")}
        >
          S'inscrire
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Bryndan_Write",
    fontSize: 30,
  },
});
