import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { AntDesign } from "@expo/vector-icons";

export default ({ correct, visible }) => {
  if (!visible) return null;

  const icon = correct ? "checkcircle" : "closecircle";
  const animation = correct ? "bounce" : "shake";
  const circleStyles = [styles.circle];

  if (correct) {
    circleStyles.push(styles.circleCorrect);
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={animation}
        iterationCount="infinite"
        duration={2000}
      >
        <View style={circleStyles}>
          <AntDesign name={icon} size={80} color="#FFF" />
        </View>
      </Animatable.View>
    </View>
  );
};

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#e74c3c",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleCorrect: {
    backgroundColor: "#26E636",
  },
});
