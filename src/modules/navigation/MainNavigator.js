import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import PatientsListScreen from "../../views/PatientsListScreen";
import PatientCardScreen from "../../views/PatientCardScreen";
import AddPatientScreen from "../../views/AddPatientScreen";
import { Colors, Typography } from "../../constants/styles";
import FontForgeIcon from "../../components/common/FontForgeIcon";

import AuthProvider, { useAuth } from "../context/Auth";
import AuthStack from "./Auth";

const Stack = createStackNavigator();

const AppStack = createStackNavigator();

const AppStackScreen = () => {
  const { state } = useAuth();
  const { isLoggedIn } = state;

  React.useEffect(() => {
    console.log(`isLoggedIn: ${isLoggedIn}`);
  });

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn === false ? (
        <AppStack.Screen name="Auth" component={AuthStack} />
      ) : (
        <AppStack.Screen name="Home" component={HomeScreen} />
      )}
    </AppStack.Navigator>
  );
};

const HomeScreen = () => {
  const { handleLogout } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PURPLE,
          height: 105,
          borderBottomLeftRadius: 50,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontSize: Typography.FONT_SIZE_17,
          alignSelf: "center",
          color: Colors.PURPLE_VERY_LIGHT,
          fontFamily: Typography.FONT_FAMILY_BOLD,
          paddingBottom: 7,
        },
        headerRight: () => (
          <FontForgeIcon
            name="doctor_profile"
            size={30}
            color={Colors.PURPLE_VERY_LIGHT}
            style={{
              marginRight: 20,
              marginBottom: 7,
            }}
          />
        ),
        headerLeft: () => (
          <Button title="wyloguj" onPress={handleLogout} /> // TODO for development only ??
        ),
        headerBackImage: () => (
          <FontForgeIcon
            name="back"
            size={32}
            color={Colors.PURPLE_VERY_LIGHT}
            style={{
              paddingTop: 8,
              marginLeft: 11,
              alignSelf: "flex-start",
              fontWeight: Typography.FONT_WEIGHT_BOLD,
              transform: [{ rotate: "352deg" }],
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="PatientsList"
        component={PatientsListScreen}
        options={{ title: "Lista pacjentów" }}
      />
      <Stack.Screen
        name="PatientCard"
        component={PatientCardScreen}
        options={{
          title: "Karta pacjenta",
        }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatientScreen}
        options={{
          title: "Dane osobowe",
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppStackScreen />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
