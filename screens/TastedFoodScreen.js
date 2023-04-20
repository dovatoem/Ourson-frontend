import { StyleSheet, Text, View } from "react-native";
import { useTheme, Button, Chip } from "react-native-paper";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TastedFoodChip = ({ name }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Chip
      mode={isSelected ? "flat" : "outlined"}
      style={[styles.chip, isSelected && { backgroundColor: "#FFDAD4" }]}
      selected={isSelected}
      icon={isSelected ? "check" : null}
      onPress={() => setIsSelected(!isSelected)}
    >
      <Text style={[styles.chipText, isSelected && { fontWeight: "bold" }]}>
        {name}
      </Text>
    </Chip>
  );
};

export default function TastedFoodScreen({ navigation }) {
  const kidsArray = useSelector((state) => state.household.value.kidsArray);
  const [nbVegetables, setNbVegetables] = useState(0);
  const [nbFruits, setFruits] = useState(0);

  const theme = useTheme();
  const tastedFoodList = useSelector(
    (state) => state.household.value.tastedFood
  );

  const tastedFruitsChips = tastedFoodList?.map((data, i) => {
    if (data.type === "fruit") {
      return <TastedFoodChip key={i} name={data.name} />;
    }
    return null;
  });

  const tastedVegetablesChips = tastedFoodList?.map((data, i) => {
    if (data.type === "légume") {
      return <TastedFoodChip key={i} name={data.name} />;
    }
    return null;
  });

  const getKidNames = () => {
    return kidsArray.map((kid) => kid.kidName).join(", ");
  };

  const getVerb = () => {
    return kidsArray.length > 1 ? "ont" : "a";
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.elemContainer}>
          <Text style={styles.title}>
            Ce que {getKidNames()} {getVerb()} goûté
          </Text>

          <Text style={styles.subtitle}>Légumes</Text>
          <Text style={styles.text}>
            {nbVegetables}/{tastedVegetablesChips.length} légumes goûtés.
          </Text>

          <View style={styles.ingredientsChipsContainer}>
            {tastedVegetablesChips}
          </View>
          <Text style={styles.subtitle}>Fruits</Text>
          <Text style={styles.text}>
            {nbFruits}/{tastedFruitsChips.length} fruits goûtés.
          </Text>
          <View style={styles.ingredientsChipsContainer}>
            {tastedFruitsChips}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginBottom: 6,
    marginRight: 6,
    height: 36,
  },
  chipText: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  elemContainer: {
    margin: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  ingredientsChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    lineHeight: 24,
    marginTop: 3,
  },
  text: {
    fontFamily: "Roboto",
    lineHeight: 24,
    marginTop: 3,
  },
});
