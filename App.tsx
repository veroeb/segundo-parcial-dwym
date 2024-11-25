import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DestinationList from "./src/screens/DestinationList";
import DestinationDetails from "./src/screens/DestinationDetails";
import AddDestination from "./src/screens/AddDestination";
import { StatusBar } from "expo-status-bar";
import { Destination } from "./src/types";

export type RootStackParamList = {
  DestinationList: { refresh?: boolean };
  DestinationDetails: { destination: Destination };
  AddDestination: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
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
        <Stack.Screen
          name="AddDestination"
          component={AddDestination}
          options={{ title: "Add Destination" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
