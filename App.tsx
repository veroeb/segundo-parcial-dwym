import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import DestinationList from "./src/screens/DestinationList";
import DestinationDetails from "./src/screens/DestinationDetails";
import AddDestination from "./src/screens/AddDestination";
import { StatusBar } from "expo-status-bar";
import { Destination } from "./src/types";
import Ionicons from "react-native-vector-icons/Ionicons";

export type RootStackParamList = {
  DestinationList: { refresh?: boolean };
  DestinationDetails: { destination: Destination };
};

export type TabParamList = {
  Home: undefined;
  Add: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const DestinationStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DestinationList"
      component={DestinationList}
      options={{ title: "Destinations" }}
    />
    <Stack.Screen
      name="DestinationDetails"
      component={DestinationDetails}
      options={{ title: "Destination Details" }}
    />
  </Stack.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName:
              | "home"
              | "home-outline"
              | "add-circle"
              | "add-circle-outline" = "home-outline";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Add") {
              iconName = "add-circle";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={DestinationStack}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Add"
          component={AddDestination}
          options={{ title: "Add Destination" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
