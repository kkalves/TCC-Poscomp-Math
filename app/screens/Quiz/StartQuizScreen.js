import React, { Component } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import Icons from "react-native-vector-icons/AntDesign";

import QuizAnswer from "../../../components/Quiz/QuizAnswer";
import QuizMessage from "../../../components/Quiz/QuizMessage";
import styles from "../../styles/QuizStyle";

const screen = Dimensions.get("window");

export default class StartQuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctCount: 0,
      algebra: 0,
      analise: 0,
      calculo: 0,
      geometria: 0,
      logica: 0,
      matematica: 0,
      probabilidade: 0,

      _19: 0,
      _18: 0,
      _17: 0,
      _16: 0,

      questions: props.route.params.questions,
      totalCount: props.route.params.questions.length,
      isCheckMode: false,
      isAnswerCorrect: false,
      currentQuestion: 0,
      selectedAnswer: undefined,
    };
  }

  handleAnswerPress = (index) => {
    this.setState({ selectedAnswer: index });
    this.scrollContainer.scrollTo({ x: 0, y: screen.height, animated: true });
  };

  verifySubjectCorrect = (question) => {
    switch (question.subject) {
      case "Algebra Linear":
        this.setState({ algebra: ++this.state.algebra });
        break;
      case "Análise Combinatória":
        this.setState({ analise: ++this.state.analise });
        break;
      case "Calculo Diferencial e Integral":
        this.setState({ calculo: ++this.state.calculo });
        break;
      case "Geometria AnalÍtica":
        this.setState({ geometria: ++this.state.geometria });
        break;
      case "Lógica Matemática":
        this.setState({ logica: ++this.state.logica });
        break;
      case "Matemática Discreta":
        this.setState({ matematica: ++this.state.matematica });
        break;
      case "Probabilidade e Estatísca":
        this.setState({ probabilidade: ++this.state.probabilidade });
        break;
    }
  };

  verifyYearCorrect = (question) => {
    switch (question.year) {
      case "2019":
        this.setState({ _19: ++this.state._19 });
        break;
      case "2018":
        this.setState({ _18: ++this.state._18 });
        break;
      case "2017":
        this.setState({ _17: ++this.state._17 });
        break;
      case "2016":
        this.setState({ _16: ++this.state._16 });
        break;
    }
  };

  handleCheckPress = () => {
    if (
      this.state.selectedAnswer + 1 ===
      this.state.questions[this.state.currentQuestion].correctAnswer
    ) {
      this.verifySubjectCorrect(
        this.state.questions[this.state.currentQuestion]
      );
      this.verifyYearCorrect(this.state.questions[this.state.currentQuestion]);
      this.setState({
        isCheckMode: true,
        correctCount: ++this.state.correctCount,
        isAnswerCorrect: true,
      });
    } else {
      this.setState({ isCheckMode: true, isAnswerCorrect: false });
    }
  };

  handleNextPress = () => {
    if (this.state.currentQuestion + 1 < this.state.totalCount) {
      this.setState({
        isCheckMode: false,
        currentQuestion: ++this.state.currentQuestion,
        selectedAnswer: undefined,
      });
    }
  };

  handleExplanationPress = () => {
    this.props.navigation.navigate(
      "Explanation",
      {
        explanation: this.state.questions[this.state.currentQuestion]
          .explanation,
      },
      this.props.navigation
    );
  };

  handleFinishPress = () => {
    const subjectsCorrect = [
      { key: 0, title: "Algebra Linear", points: this.state.algebra },
      { key: 1, title: "Análise Combinatória", points: this.state.analise },
      {
        key: 2,
        title: "Calculo Diferencial e Integral",
        points: this.state.calculo,
      },
      { key: 3, title: "Geometria AnalÍtica", points: this.state.geometria },
      { key: 4, title: "Lógica Matemática", points: this.state.logica },
      { key: 5, title: "Matemática Discreta", points: this.state.matematica },
      {
        key: 6,
        title: "Probabilidade e Estatísca",
        points: this.state.probabilidade,
      },
    ];
    console.log(subjectsCorrect);

    const yearsCorrect = [
      { key: 0, title: "2019", points: this.state._19 },
      { key: 1, title: "2018", points: this.state._18 },
      { key: 2, title: "2017", points: this.state._17 },
      { key: 3, title: "2016", points: this.state._16 },
    ];
    console.log(yearsCorrect);
    this._clearState();
    this.props.navigation.navigate("FinishQuiz", {
      correctCount: this.state.correctCount,
      totalCount: this.state.totalCount,
      subjectsCorrect: subjectsCorrect,
      yearsCorrect: yearsCorrect,
    });
  };

  _clearState = () => {
    this.setState({
      correctCount: 0,
      questions: this.props.route.params.questions,
      totalCount: 0,
      isCheckMode: false,
      isAnswerCorrect: false,
      currentQuestion: 0,
      selectedAnswer: undefined,
      algebra: 0,
      analise: 0,
      calculo: 0,
      geometria: 0,
      logica: 0,
      matematica: 0,
      probabilidade: 0,
      _19: 0,
      _18: 0,
      _17: 0,
      _16: 0,
    });
  };

  render() {
    const buttonStyle = [styles.button];

    if (!this.state.isCheckMode) {
      buttonStyle.push(styles.buttonDisable);
    }
    return (
      <ScrollView
        ref={(scroll) => (this.scrollContainer = scroll)}
        onContentSizeChange={() => {
          this.scrollContainer.scrollTo({
            x: 0,
            y: screen.height,
            animated: true,
          });
        }}
        style={styles.container}
        contentContainerStyle={styles.insideContainer}
      >
        <StatusBar backgroundColor="#009362" style="light" />
        <View style={styles.header}>
          <Text style={styles.textCount}>
            {`${this.state.currentQuestion + 1} / ${this.state.totalCount}`}
          </Text>
          <Image
            style={styles.headerImage}
            source={this.state.questions[this.state.currentQuestion].question}
            resizeMode="contain"
          />
        </View>
        <View style={styles.answerContainer}>
          {this.state.questions[this.state.currentQuestion].answers.map(
            (answer, index) => (
              <QuizAnswer
                key={index}
                index={index}
                image={answer}
                disabled={this.state.isCheckMode}
                isCorrect={
                  index + 1 ===
                  this.state.questions[this.state.currentQuestion].correctAnswer
                }
                isSelected={index === this.state.selectedAnswer}
                onPress={this.handleAnswerPress}
              />
            )
          )}
        </View>
        {this.state.selectedAnswer >= 0 && (
          <View style={styles.optionContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={
                  this.state.isCheckMode
                    ? this.state.currentQuestion + 1 === this.state.totalCount
                      ? this.handleFinishPress
                      : this.handleNextPress
                    : this.handleCheckPress
                }
              >
                {this.state.isCheckMode ? (
                  this.state.currentQuestion + 1 === this.state.totalCount ? (
                    <Icons name="check" size={30} color="#fff" />
                  ) : (
                    <Icons name="arrowright" size={30} color="#fff" />
                  )
                ) : (
                  <Icons name="like2" size={30} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={styles.buttonText}>
                {this.state.isCheckMode
                  ? this.state.currentQuestion + 1 === this.state.totalCount
                    ? "Finalizar"
                    : "Próxima"
                  : "Confirmar"}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={buttonStyle}
                disabled={!this.state.isCheckMode}
                onPress={this.handleExplanationPress}
              >
                <Icons name="exception1" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.buttonText}>Explicação</Text>
            </View>
          </View>
        )}
        <View style={{ margin: 10 }} />
        <QuizMessage
          correct={this.state.isAnswerCorrect}
          visible={this.state.isCheckMode}
        />
      </ScrollView>
    );
  }
}
