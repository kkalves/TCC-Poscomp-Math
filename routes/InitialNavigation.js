import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import Index from "../Index";

const InitialStack = createStackNavigator();

export default InitialNavigation = () => (
  <NavigationContainer>
    <InitialStack.Navigator headerMode="none" initialRouteName="Initial">
      <InitialStack.Screen name="Initial" component={Index} />
      <InitialStack.Screen name="Auth" component={AuthNavigation} />
      <InitialStack.Screen name="App" component={AppNavigation} />
    </InitialStack.Navigator>
  </NavigationContainer>
);
