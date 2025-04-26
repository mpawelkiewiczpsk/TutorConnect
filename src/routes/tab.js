import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../views/Home";
import TutorScreen from "../views/Tutor";
import SubjectsScreen from "../views/Subjects";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, focused }) => {
          let color = focused ? "red" : "gray";
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Subjects") {
            iconName = "book";
          } else if (route.name === "Tutor") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: route.name,
        tabBarActiveTintColor: "red",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name="Tutor" component={TutorScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;
