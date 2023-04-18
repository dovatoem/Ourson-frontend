import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { emptyHousehold } from "../reducers/household";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const household = useSelector((state) => state.household.value);
  const user = useSelector((state) => state.user.value);

  const handleLogout = () => {        
    navigation.navigate("Hero");
    dispatch(logout());
    dispatch(emptyHousehold());
  }

  return (
    <View style={styles.fullContainer}>
      <SafeAreaView style={styles.safeArea} />
      <ImageBackground
        source={require("../assets/parametersBackground.png")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <View style={styles.header}>
            <Icon
              name="chevron-left"
              size={36}
              color="black"
              onPress={() => navigation.goBack()}
              style={styles.chevron}
            />
            <Text style={styles.bigTitle}>Paramètres</Text>
            <View></View>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.title}>Vos identifiants</Text>
            <TextInput
              disabled="true"
              mode="outlined"
              label={user.email}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              disabled="true"
              mode="outlined"
              label={user.password}
              style={styles.input}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                  color="#808080"
                />
              }
            />
            <Text style={styles.title}>Compte partagé avec</Text>
            <TextInput
              disabled="true"
              mode="outlined"
              label="mami@gmail.com"
              style={styles.input}               
              right={
                <TextInput.Icon icon="close-circle-outline" color="#808080" />
              }
            />
            <Text style={styles.titleColor}>
              Ajouter une personne au compte
            </Text>
            <Text style={styles.title}>Vos enfants</Text>
            <TextInput
              disabled="true"    
              mode="outlined" 
              label={household.kidsCount}
              style={styles.input} />
            <TextInput 
              disabled="true"   
              mode="outlined" 
              label="Emilian"              
              style={styles.input} />
            <TextInput 
              disabled="true"
              mode="outlined" 
              label="36"
              style={styles.input}
          />
          <Text style={styles.titleColor}>Ajouter un enfant au compte</Text>
          <Text style={styles.title}>Votre foyer</Text>
            <TextInput  
              disabled="true"  
              mode="outlined" 
              label={household.hhSize}
              style={styles.input} />
          <Text style={styles.title}>Régime parental</Text>
            <TextInput 
              disabled="true"   
              mode="outlined" 
              label={household.diet}
              style={styles.input} />
          <Button
            style={styles.button}
            contentStyle={{ width: 180, height: 60 }}
            mode="outlined"
            onPress={() => handleLogout()}
            title="Déconnexion"
            >Déconnexion</Button>                 
          </ScrollView>
          <View style={styles.bottom}>
            <Text></Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  // safeArea: {
  //   flex: 1,
  //   marginBottom: 35,
  // },
  header: {
    flexDirection: "row",
    marginTop: "10%",
    width: "80%",
  },
  bigTitle: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 700,
    paddingLeft: 20,
    marginBottom: 30,
  },
  keyboard: {
    flex: 1,
    width: "80%",
  },
  scrollView: {
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: 700,
    marginTop: "7%",
    marginLeft: "7%",
    alignSelf: "flex-start",
  },
  input: {
    width: "86%",
    backgroundColor: "white",
  },
  titleColor: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 700,
    marginTop: "7%",
    color: "rgb(255, 107, 87)",
  },
  button: {
    borderRadius: 60,
    marginTop: "7%",
    marginBottom: "7%",
    justifyContent: "center",
  }, 
  bottom: {
    marginBottom: "20%",
  },
});
