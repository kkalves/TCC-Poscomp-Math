import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import BackgroundApp from "../../../components/BackgroundApp";
import { questions } from "../../../database/json/Questions";
import { subject } from "../../../database/json/Subjects";

export default class OptionQuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      option: props.route.params.option,
    };
  }

  defineSubjectQuiz(subject) {
    this.setState({ quizzes: [] });
    for (let index = 0; index < questions.length; index++) {
      if (questions[index].subject === subject) {
        this.state.quizzes.push(questions[index]);
      }
    }
    this.props.navigation.navigate("StartQuiz", {
      questions: this.state.quizzes,
    });
  }

  defineYearQuiz(year) {
    this.setState({ quizzes: [] });
    for (let index = 0; index < questions.length; index++) {
      if (questions[index].year === year) {
        this.state.quizzes.push(questions[index]);
      }
    }
    this.props.navigation.navigate("StartQuiz", {
      questions: this.state.quizzes,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundApp />
        {this.state.option === "Subject" ? (
          <Animatable.View
            animation="fadeInLeftBig"
            style={styles.floatContainer}
          >
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icons name="chevron-left" color="#000A06" size={30} />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Escolha a área desejada:</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.ALG)}
            >
              <Text style={styles.buttonText}>{subject.ALG}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.ANAL)}
            >
              <Text style={styles.buttonText}>{subject.ANAL}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.CALC)}
            >
              <Text style={styles.buttonText}>{subject.CALC}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.GEO)}
            >
              <Text style={styles.buttonText}>{subject.GEO}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.LOG)}
            >
              <Text style={styles.buttonText}>{subject.LOG}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.MAT)}
            >
              <Text style={styles.buttonText}>{subject.MAT}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineSubjectQuiz(subject.PBE)}
            >
              <Text style={styles.buttonText}>{subject.PBE}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <Animatable.View
            animation="fadeInLeftBig"
            style={styles.floatContainer}
          >
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icons name="chevron-left" color="#000A06" size={30} />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Escolha o ano desejado:</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineYearQuiz("2016")}
            >
              <Text style={styles.buttonText}>{"2016"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineYearQuiz("2017")}
            >
              <Text style={styles.buttonText}>{"2017"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineYearQuiz("2018")}
            >
              <Text style={styles.buttonText}>{"2018"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.defineYearQuiz("2019")}
            >
              <Text style={styles.buttonText}>{"2019"}</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009362",
  },
  floatContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 10,
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#000A06",
    fontSize: 18,
    fontFamily: "Bold",
  },
  title: {
    color: "#000A06",
    fontSize: 25,
    fontFamily: "ExtraBold",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#009362",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Semibold",
  },
});
