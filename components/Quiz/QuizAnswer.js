import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

const screen = Dimensions.get("window");
let answerBorder = "transparent";

export default ({ index, image, disabled, isCorrect, isSelected, onPress }) => {
  if (disabled && isSelected) {
    answerBorder = isCorrect ? "#26E636" : "#e74c3c";
  } else if (disabled && !isSelected) {
    answerBorder = isCorrect ? "#26E636" : "transparent";
  } else {
    answerBorder = isSelected ? "#000A06" : "transparent";
  }

  return (
    <TouchableOpacity
      style={[style.button, { borderColor: answerBorder }]}
      disabled={disabled}
      onPress={() => onPress(index)}
    >
      <Image style={style.image} resizeMode="contain" source={image} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    marginTop: 10,
    borderRadius: 10,
    borderColor: answerBorder,
    borderWidth: 2,
    width: screen.width * 0.9,
  },
  image: {
    width: screen.width * 0.8,
    margin: 10,
  },
});
