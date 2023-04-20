import Header from "../components/Header";
import SingleRecipe from "../components/SingleRecipe";

import { View } from "react-native";

export default function PanicModeRecipeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header navigation={navigation} />
      <SingleRecipe navigation={navigation} />
    </View>
  );
}
