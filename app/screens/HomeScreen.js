import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";

import Firebase from "../../database/firebase";
import styles from "../styles/HomeStyle";
import BackgroundApp from "../../components/BackgroundApp";
import * as firebase from "firebase";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: [], email: "" }, message: "" };
    this.subscriber = firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        console.log("Total users: ", querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().userId === firebase.auth().currentUser.uid
          ) {
            this.setState({
              user: {
                name: documentSnapshot.data().name.split(" "),
                email: documentSnapshot.data().email,
              },
            });
            console.log(
              "User ID: ",
              documentSnapshot.id,
              documentSnapshot.data()
            );
          }
        });
      });
  }

  showMessage = () => {
    const { name } = this.state.user;
    const creationTime = firebase.auth().currentUser.metadata.creationTime;
    const lastSignInTime = firebase.auth().currentUser.metadata.lastSignInTime;
    if (creationTime === lastSignInTime) {
      return (
        <View>
          <Text style={styles.title}>Olá {this.state.user.name[0]}!</Text>
          <Text style={styles.subtitle}>Seja bem vindo ao PoscompMath.</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.title}>Olá {name[0]}!</Text>
          <Text style={styles.subtitle}>
            Ficamos felizes em te ver novamente.
          </Text>
        </View>
      );
    }
  };

  signOutUser = () => {
    Firebase.shared.singOut();
    firebase.auth().signOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009362" style="light" />
        <BackgroundApp />
        <View style={styles.messageContainer}>
          <Animatable.View
            animation="fadeInLeftBig"
            style={styles.imageContainer}
          >
            <Image
              source={require("../../assets/HomeModel.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </Animatable.View>
          <Animatable.View animation="fadeInRightBig" style={styles.message}>
            {this.showMessage()}
          </Animatable.View>
        </View>
      </View>
    );
  }
}
