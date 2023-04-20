import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme, Button, Chip } from "react-native-paper";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTastedFood, removeTastedFood } from "../reducers/household";

const TastedFoodChip = ({ food, name, isSelectedInDB }) => {
  const [isSelected, setIsSelected] = useState(isSelectedInDB);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const onPress = () => {
    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);
    if (newIsSelected) {
      fetch("https://back.ourson.app/tastedFoods/addTastedFood/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          token: user.token,
          tastedFoodID: food,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            dispatch(addTastedFood(food));
          } else {
            setIsSelected(!newIsSelected);
          }
        })
        .catch(() => {
          setIsSelected(!newIsSelected);
        });
    } else {
      fetch("https://back.ourson.app/tastedFoods/removeTastedFood/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token,
          tastedFoodID: food,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(removeTastedFood(food));
          } else {
            setIsSelected(!newIsSelected);
          }
        })
        .catch(() => {
          setIsSelected(!newIsSelected);
        });
    }
  };

  return (
    <Chip
      mode={isSelected ? "flat" : "outlined"}
      style={[styles.chip, isSelected && { backgroundColor: "#FFDAD4" }]}
      selected={isSelected}
      icon={isSelected ? "check" : null}
      onPress={onPress}
    >
      <Text
        style={[styles.chipText, isSelected && { fontFamily: "Roboto-Bold" }]}
      >
        {name}
      </Text>
    </Chip>
  );
};

export default function TastedFoodScreen({ navigation }) {
  const kidsArray = useSelector((state) => state.household.value.kidsArray);
  const tastedFoodsList = useSelector(
    (state) => state.household.value.tastedFoods
  );
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetch("https://back.ourson.app/tastedFoods/foodList")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFoodList(data.recipes);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const nbFruits = foodList?.filter((data) =>
    tastedFoodsList.some((tastedFood) => {
      return tastedFood._id === data._id && data.type === "fruit";
    })
  );
  console.log(nbFruits);

  const nbVegetables = foodList?.filter((data) =>
    tastedFoodsList.some((tastedFood) => {
      return tastedFood._id === data._id && data.type === "légume";
    })
  );

  const fruitsChips = foodList
    ?.filter((food) => food.type === "fruit")
    .map((data, i) => {
      if (
        tastedFoodsList.some((tastedFood) => {
          return tastedFood === data._id;
        })
      ) {
        return (
          <TastedFoodChip
            key={data._id}
            food={data._id}
            name={data.name}
            isSelectedInDB={true}
          />
        );
      } else {
        return (
          <TastedFoodChip
            key={data._id}
            food={data._id}
            name={data.name}
            isSelectedInDB={false}
          />
        );
      }
    });

  const vegetablesChips = foodList
    ?.filter((food) => food.type === "légume")
    .map((data, i) => {
      if (
        tastedFoodsList.some((tastedFood) => {
          return tastedFood === data._id;
        })
      ) {
        return (
          <TastedFoodChip
            key={data._id}
            food={data._id}
            name={data.name}
            isSelected={true}
          />
        );
      } else {
        return (
          <TastedFoodChip
            key={data._id}
            food={data._id}
            name={data.name}
            isSelectedInDB={false}
          />
        );
      }
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
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.subtitle}>Légumes</Text>
            {/* <Text style={styles.text}>
              {nbVegetables}/{vegetablesChips.length} légumes goûtés.
            </Text> */}

            <View style={styles.ingredientsChipsContainer}>
              {vegetablesChips}
            </View>

            <Text style={styles.subtitle}>Fruits</Text>
            {/* <Text style={styles.text}>
              {nbFruits}/{fruitsChips.length} fruits goûtés.
            </Text> */}

            <View style={styles.ingredientsChipsContainer}>{fruitsChips}</View>
          </ScrollView>
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
