import Header from "../components/Header";
import DayScreen from "../components/DayScreen";

import { View } from "react-native";

export default function MondayScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header navigation={navigation} />
      <DayScreen navigation={navigation} />
    </View>
  );
}
