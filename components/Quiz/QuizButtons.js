import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default ({}) => {
  if (!visible) return null;

  const icon = correct ? "checkcircle" : "closecircle";
  const circleStyles = [styles.circle];

  if (correct) {
    circleStyles.push(styles.circleCorrect);
  }

  return (
    <View style={styles.container}>
      <View style={circleStyles}>
        <AntDesign name={icon} size={60} color="#FFF" />
      </View>
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
    backgroundColor: "#E74C3C",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleCorrect: {
    backgroundColor: "#27AE60",
  },
});
