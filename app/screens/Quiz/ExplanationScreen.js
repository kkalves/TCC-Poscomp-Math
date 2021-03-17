import React from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("screen");

export default function ExplanationScreen({ route }) {
  const { explanation } = route.params;
  console.log(explanation);
  return (
    <View style={{ flex: 1, backgroundColor: "#033e37" }}>
      <ScrollView>
        <View style={{ width: width, height: height * 0.88 }}>
          <Image
            source={explanation}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              width: width,
              height: height * 0.9,
            }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
}
