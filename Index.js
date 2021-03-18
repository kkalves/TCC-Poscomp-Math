import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import firebase from "./database/firebase";

export default class Index extends Component {
  componentDidMount() {
    firebase.shared.checkUserAuth((user) => {
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> CARREGANDO... </Text>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
}
