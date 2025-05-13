import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TutorProfileScreen from "../views/TutorProfileScreen";
import Tabs from "./tab";
import LoginScreen from "../views/Login";
import BookingScreen from "../views/BookingScreen";

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={options} />
      <Stack.Screen name="Tabs" component={Tabs} options={options} />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: "Potwierdź rezerwację" }}
      />
      <Stack.Screen
        name="TutorProfile"
        component={TutorProfileScreen}
        options={{ title: "Profil korepetytora" }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
