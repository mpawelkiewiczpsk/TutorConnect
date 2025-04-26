import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import * as React from "react";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() =>
          navigation.navigate("Details", {
            id: 151900,
          })
        }
        title="Go to details"
        color="#841584"
      />
    </View>
  );
}

export default HomeScreen;
