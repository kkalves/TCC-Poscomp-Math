import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase";

import BackgroundApp from "../../../components/BackgroundApp";

const screen = Dimensions.get("window");

export default class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctNumber: props.route.params.correctCount,
      totalNumber: props.route.params.totalCount,
      correctSubjects: props.route.params.subjectsCorrect,
      correctYears: props.route.params.yearsCorrect,
    };
  }

  handleFinishQuiz = () => {
    console.log("Aqui");
    const uid = firebase.auth().currentUser.uid;
    const date = 
    console.log("UID: " + uid);
    firebase
      .firestore()
      .collection("Quiz")
      .add({
        userID: uid,
        answerTotalNumber: this.state.totalNumber,
        answerCorrect: this.state.correctNumber,
        answerCorrectBySubjects: this.state.correctSubjects,
        answerCorrectByYear: this.state.correctYears,
      })
      .then(() => {
        console.log("Quiz Adicionado!");
        this.props.navigation.navigate("Quiz");
      });
    // Firebase.shared
    //   .createQuizScoreAsync(
    //     this.state.totalNumber,
    //     this.state.correctNumber,
    //     this.state.correctSubjects,
    //     this.state.correctYears
    //   )
    //   .then(() => {
    //     console.log('Quiz Adicionado!');
    //     this.props.navigation.navigate("Quiz");
    //   })
    //   .catch((error) => {
    //     console.log(error.code);
    //     this.setState({ errorMessage: error.code });
    //   });
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <BackgroundApp />
        <View style={{ flexDirection: "row" }}>
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
            style={{ flex: 1 }}
          >
            <Image
              source={require("../../../assets/BG_Quiz/BGFinishQuizMediumModel.png")}
              style={{ width: screen.width, height: screen.height }}
              resizeMode="cover"
            />
          </Animatable.View>
          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Animatable.View
              animation="zoomInDown"
              duration={2000}
              style={{
                alignItems: "center",
                padding: 20,
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 45,
                  fontFamily: "ExtraBold",
                  marginRight: 10,
                }}
              >
                Quiz Finalizado!
              </Text>
            </Animatable.View>
            <Animatable.View
              animation="fadeInRightBig"
              duration={2000}
              style={{
                alignItems: "center",
                padding: 20,
                marginTop: 40,
                width: screen.width / 2,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 22,
                    fontFamily: "Bold",
                  }}
                >
                  Você acertou
                </Text>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 26,
                    fontFamily: "Bold",
                  }}
                >
                  {`${this.state.correctNumber} / ${this.state.totalNumber}`}
                </Text>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 22,
                    fontFamily: "Bold",
                  }}
                >
                  perguntas!
                </Text>
              </View>
            </Animatable.View>
            <Animatable.View
              animation="fadeInRightBig"
              duration={4000}
              style={{
                alignItems: "center",
                padding: 20,
                marginBottom: 0,
                width: screen.width / 2,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#25da48",
                  padding: 10,
                  borderRadius: 10,
                  width: screen.width * 0.5,
                }}
                onPress={() => this.handleFinishQuiz()}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontFamily: "Bold",
                    margin: 10,
                    textTransform: "uppercase",
                  }}
                >
                  Finalizar Quiz
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </View>
    );
  }
}
