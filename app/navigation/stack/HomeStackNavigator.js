import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/HomeScreen";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
