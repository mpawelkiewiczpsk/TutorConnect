import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/routes/stack";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
