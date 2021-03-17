import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeStackNavigator from "../stack/HomeStackNavigator";
import ProfileStackNavigator from "../stack/ProfileStackNavigator";
import AboutTabNavigator from "./AboutTabNavigator";
import QuizStackNavigator from "../stack/QuizStackNavigator";

const AppTab = createMaterialBottomTabNavigator();

const AppNavigation = () => (
  <AppTab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    style={{ backgroundColor: "#009362" }}
  >
    <AppTab.Screen
      name="Home"
      component={HomeStackNavigator}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#006c48",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <AppTab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{
        tabBarLabel: "Perfil",
        tabBarColor: "#007f55",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
    <AppTab.Screen
      name="Quiz"
      component={QuizStackNavigator}
      options={{
        tabBarLabel: "Quiz",
        tabBarColor: "#009362",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="book-open-page-variant"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <AppTab.Screen
      name="About"
      component={AboutTabNavigator}
      options={{
        tabBarLabel: "Sobre",
        tabBarColor: "#00a76f",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="information" color={color} size={26} />
        ),
      }}
    />
  </AppTab.Navigator>
);
export default AppNavigation;
