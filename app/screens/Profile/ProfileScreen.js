import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase";

import BackgroundApp from "../../../components/BackgroundApp";
import exampleImage from "../../../assets/defaultImage.jpg";
import ProfileChart from "../../../components/Profile/ProfileChart";

const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        photo: null,
      },
      quizzes: [],
    };
    this.subscriber = firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().userId === firebase.auth().currentUser.uid
          ) {
            this.setState({
              user: {
                name: documentSnapshot.data().name,
                email: documentSnapshot.data().email,
                photo:
                  documentSnapshot.data().photo != undefined
                    ? documentSnapshot.data().photo
                    : exampleImageUri,
              },
            });
          }
        });
      });
  }

  componentDidMount() {
    this.unsubscribe = firebase
      .firestore()
      .collection("Quiz")
      .onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const quizzes = [];
    querySnapshot.forEach((document) => {
      if (document.data().userID === firebase.auth().currentUser.uid) {
        quizzes.push({
          answerCorrect: document.data().answerCorrect,
          answerCorrectBySubjects: document.data().answerCorrectBySubjects,
          answerCorrectByYear: document.data().answerCorrectByYear,
          answerTotalNumber: document.data().answerTotalNumber,
        });
      }
    });
    this.setState({ quizzes });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009362" style="light" />
        <BackgroundApp />
        <Animatable.View
          animation="bounceIn"
          duration={2000}
          style={styles.header}
        >
          <View style={styles.userInfoSection}>
            <Avatar.Image source={{ uri: this.state.user.photo }} size={120} />
            <View style={{ alignItems: "center" }}>
              <Title style={styles.name}>{this.state.user.name}</Title>
              <Caption style={styles.caption}>{this.state.user.email}</Caption>
            </View>
          </View>
        </Animatable.View>
        <Animatable.Text
          animation="bounceInLeft"
          duration={3000}
          style={styles.title}
        >
          Desempenho Pessoal
        </Animatable.Text>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ProfileChart quizDatas={this.state.quizzes} />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009362",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoSection: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 24,
    marginTop: 10,
    fontFamily: "ExtraBold",
    textAlign: "center",
  },
  caption: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontFamily: "Regular",
    lineHeight: 14,
    marginBottom: 10,
  },
  footer: {
    flex: 4,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    color: "#fff",
    fontSize: 32,
    fontFamily: "ExtraBold",
  },
});
