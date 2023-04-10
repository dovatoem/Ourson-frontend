import { Button } from "react-native-paper";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

export default function DayScreen() {
  // <Icon name="heart-outline" size={32} color="#FF6B57" />
  return (
    <View style={styles.container}>
      <View style={styles.titleContain}>
        <Text style={styles.title}>Midi</Text>
        <View style={styles.iconContain}>
          <Icon name="heart" size={32} color="#FF6B57" />
          <Icon name="refresh" size={36} color="black" />
        </View>
      </View>
      <View style={styles.recipesContain}>
        <View style={styles.recipeContain}>
          <View style={styles.recipeCard}>
            <ImageBackground
              style={{
                height: 140,
                width: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 8,
              }}
              source={{
                uri: "https://cdn.cuisinez-pour-bebe.fr/wp-content/uploads/2021/10/puree-de-navet.jpg",
              }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                style={{
                  height: 140,
                  width: 140,
                  position: "absolute",
                  bottom: 0,
                  opacity: 0.7,
                }}
              />
              <Text style={styles.recipeTitle}>Purée de navet</Text>
            </ImageBackground>
          </View>
          <View style={styles.recipePortion}>
            <Text style={styles.titlePortion}>Portions</Text>
            <View style={styles.changePortion}>
              <Icon name="minus" size={28} color="black" />
              <Text style={styles.nbPortion}>2</Text>
              <Icon name="plus" size={28} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.recipeContain}>
          <View style={styles.recipeCard}>
            <ImageBackground
              style={{
                height: 140,
                width: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 8,
              }}
              source={{
                uri: "https://www.cuisineactuelle.fr/imgre/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Fcac.2F2023.2F02.2F16.2F5900321a-c736-437f-b118-135442ba7194.2Ejpeg/555x276/quality/80/crop-from/center/gratin-de-legumes-d-hiver-au-four.jpeg",
              }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
                style={{
                  height: 140,
                  width: 140,
                  position: "absolute",
                  bottom: 0,
                  opacity: 0.7,
                }}
              />
              <Text style={styles.recipeTitle}>Gratin d'hiver</Text>
            </ImageBackground>
          </View>
          <View style={styles.recipePortion}>
            <Text style={styles.titlePortion}>Portions</Text>
            <View style={styles.changePortion}>
              <Icon name="minus" size={28} color="black" />
              <Text style={styles.nbPortion}>2</Text>
              <Icon name="plus" size={28} color="black" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 30,
    marginLeft: 40,
    marginRight: 40,
  },
  titleContain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 32,
  },
  iconContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
  recipesContain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeContain: {
    display: "flex",
    flexDirection: "column",
  },
  recipeCard: {
    width: 140,
    height: 140,
    borderRadius: 8,
    resizeMode: "cover",
    overflow: "hidden",
  },
  recipeTitle: {
    fontFamily: "Bryndan_Write",
    fontSize: 24,
    lineHeight: 26,
    color: "white",
  },
  recipePortion: {
    width: 140,
    height: 65,
    marginTop: 6,
  },
  titlePortion: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
  changePortion: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 4,
  },
  nbPortion: { fontSize: 20, lineHeight: 20 },
});
