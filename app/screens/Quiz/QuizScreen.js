import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import BackgroundApp from "../../../components/BackgroundApp";
import FloatingButton from "../../../components/Quiz/FloatingButton";
import { questions } from "../../../database/json/Questions";

const screen = Dimensions.get("window");

export default class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
    };
  }

  handleStandardQuizPress = () => {
    let lastPositions = [];
    this.setState({ quizzes: [] });
    for (let index = 0; lastPositions.length < 20; index++) {
      const item = Math.floor(Math.random() * questions.length);
      if (!lastPositions.includes(item)) {
        lastPositions.push(item);
        this.state.quizzes.push(questions[item]);
      }
    }

    this.props.navigation.navigate("StartQuiz", {
      questions: this.state.quizzes,
    });
  };

  handleSubjectQuizPress = () => {
    this.props.navigation.navigate("OptionQuiz", {
      option: "Subject",
    });
  };

  handleYearQuizPress = () => {
    this.props.navigation.navigate("OptionQuiz", {
      option: "Year",
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <BackgroundApp />
        <View>
          <Animatable.View
            animation="fadeInLeft"
            style={{ ...StyleSheet.absoluteFill }}
          >
            <Image
              source={require("../../../assets/BG_Quiz/BGQuizModel.png")}
              style={{
                top: -80,
                bottom: 0,
                left: 0,
                right: 0,
                width: screen.width * 1.1,
                height: screen.height * 1.1,
              }}
              resizeMode="contain"
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInRightBig"
            duration={2000}
            style={{ flex: 1 }}
          >
            <Image
              source={require("../../../assets/BG_Quiz/BGQuizText.png")}
              style={{
                top: -80,
                right: -20,
                width: screen.width,
                height: screen.height,
              }}
              resizeMode="contain"
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInRightBig"
            duration={3000}
            style={{ ...StyleSheet.absoluteFill }}
          >
            <Image
              source={require("../../../assets/BG_Quiz/BGQuizTitle.png")}
              style={{
                top: -60,
                right: -20,
                width: screen.width,
                height: screen.height,
              }}
              resizeMode="contain"
            />
          </Animatable.View>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={3000}
          style={{ ...StyleSheet.absoluteFill }}
        >
          <FloatingButton
            StandardPress={this.handleStandardQuizPress}
            SubjectPress={this.handleSubjectQuizPress}
            YearPress={this.handleYearQuizPress}
          />
        </Animatable.View>
      </View>
    );
  }
}
