import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

export default ({ currentQuestion, totalQuestion, image }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${
        currentQuestion + 1
      } / ${totalQuestion}`}</Text>
      <Image style={styles.image} source={image} resizeMode="contain" />
    </View>
  );
};

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: "#2C3E50",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: -0.1,
  },
  image: {
    borderRadius: 10,
    width: screen.width * 0.9,
  },
});
