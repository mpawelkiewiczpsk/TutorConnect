import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../views/Home";
import LoginScreen from "../views/Login";
import Tabs from "./tab";

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false,
};
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={options} />
      <Stack.Screen name="Tabs" component={Tabs} options={options} />
    </Stack.Navigator>
  );
}

export default RootStack;
