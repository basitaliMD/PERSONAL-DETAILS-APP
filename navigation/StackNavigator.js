import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./TabNavigator";
import DataScreen from "../screens/dataScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator;