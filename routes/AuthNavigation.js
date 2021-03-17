import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../auth/screens/LoginScreen";
import SignUpScreen from "../auth/screens/SignUpScreen";
import ForgotPasswordScreen from "../auth/screens/ForgotPasswordScreen";

const AuthStack = createStackNavigator();

const AuthNavigation = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);
export default AuthNavigation;
