import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../screens/Profile/ProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackNavigator;
