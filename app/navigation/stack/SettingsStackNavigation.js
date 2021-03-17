import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../../screens/Settings/SettingsScreen";

const SettingsStack = createStackNavigator();

const SettingsStackNavigator = () => (
  <SettingsStack.Navigator headerMode="none">
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsStackNavigator;
