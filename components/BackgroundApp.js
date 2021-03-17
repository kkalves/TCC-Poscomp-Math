import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default () => {
  return (
    <View style={{ ...StyleSheet.absoluteFill }}>
      <Image
        source={require("../assets/Background.png")}
        style={{
          flex: 1,
          height: null,
          width: null,
        }}
      />
    </View>
  );
};
