import React, { Component } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";

const { height, width } = Dimensions.get("screen");

export default class AboutPoscompScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#033e37" }}>
        <ScrollView>
          <View style={{ width: width, height: height * 0.88 }}>
            <Image
              source={require("../../../assets/Raiox.png")}
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
}
