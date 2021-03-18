import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/DrawerContent";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import AppTabNavigation from "../app/navigation/tab/AppTabNavigation";
import SettingsStackNavigation from "../app/navigation/stack/SettingsStackNavigation";

const AppDrawer = createDrawerNavigator();

const AppNavigation = () => (
  <AppDrawer.Navigator
    initialRouteName="AppTab"
    drawerType="slide"
    drawerStyle={{ backgroundColor: "#009362" }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <AppDrawer.Screen
      name="AppTab"
      component={AppTabNavigation}
      options={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "#009362",
        },
        headerTintColor: "#fff",
        headerTitle: "",
        // drawerIcon: "menu",
      }}
    />
    <AppDrawer.Screen
      name="Settings"
      component={SettingsStackNavigation}
      options={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "#009362",
        },
        headerTintColor: "#fff",
        headerTitle: "",
      }}
    />
  </AppDrawer.Navigator>
);

export default AppNavigation;
