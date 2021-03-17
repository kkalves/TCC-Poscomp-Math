import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AboutPoscompScreen from "../../screens/About/AboutPoscompScreen";
import AboutPoscompInfoScreen from "../../screens/About/AboutPoscompInfoScreen";
import AboutAppScreen from "../../screens/About/AboutAppScreen";

const AboutTab = createMaterialTopTabNavigator();

function AboutTabNavigator() {
  return (
    <AboutTab.Navigator
      initialRouteName="AboutPoscomp"
      tabBarOptions={{
        activeTintColor: "#000A06",
        inactiveTintColor: "rgba(0,0,0,0.2)",
        labelStyle: { fontSize: 14, fontFamily: "Bold" },
        indicatorStyle: { backgroundColor: "#009362", height: 3 },
      }}
    >
      <AboutTab.Screen
        name="AboutPoscomp"
        component={AboutPoscompScreen}
        options={{ title: "Sobre o Poscomp" }}
      />
      <AboutTab.Screen
        name="AboutPoscompInfo"
        component={AboutPoscompInfoScreen}
        options={{ title: "Raio X Poscomp" }}
      />
      <AboutTab.Screen
        name="AboutApp"
        component={AboutAppScreen}
        options={{ title: "Sobre o Aplicativo" }}
      />
    </AboutTab.Navigator>
  );
}

export default AboutTabNavigator;
